"""
Python Processing Service for Excel Script Processor

This Python script can be deployed as a separate microservice
to handle actual Excel file processing with pandas.

Deployment options:
1. AWS Lambda with a Python runtime
2. Google Cloud Functions
3. A containerized service on any cloud platform
4. Separate Express.js server with child_process to run Python

Dependencies:
- pandas
- openpyxl (for .xlsx files)
- xlrd (for .xls files)
- numpy
"""

import json
import sys
import pandas as pd
import io
import base64
from typing import Dict, Any

def validate_script(script: str) -> tuple[bool, str]:
    """
    Validate the Python script for security issues.
    
    Returns: (is_valid, error_message)
    """
    # List of dangerous imports/operations
    dangerous_patterns = [
        'import os',
        'import sys',
        'import subprocess',
        '__import__',
        'eval(',
        'exec(',
        'compile(',
        'open(',
        'file(',
        'input(',
        'raw_input(',
    ]
    
    script_lower = script.lower()
    for pattern in dangerous_patterns:
        if pattern in script_lower:
            return False, f"Forbidden operation: {pattern}"
    
    return True, ""

def process_excel(file_content: bytes, script: str) -> tuple[bool, Any, str]:
    """
    Process an Excel file with the provided Python script.
    
    Args:
        file_content: Binary content of the Excel file
        script: Python script to execute
    
    Returns: (success, result_data, error_message)
    """
    try:
        # Validate script
        is_valid, error_msg = validate_script(script)
        if not is_valid:
            return False, None, error_msg
        
        # Read Excel file into DataFrame
        df = pd.read_excel(io.BytesIO(file_content))
        
        # Create a restricted namespace for execution
        namespace = {
            'df': df,
            'pd': pd,
            '__builtins__': {
                'len': len,
                'str': str,
                'int': int,
                'float': float,
                'bool': bool,
                'list': list,
                'dict': dict,
                'tuple': tuple,
                'set': set,
                'range': range,
                'enumerate': enumerate,
                'zip': zip,
                'map': map,
                'filter': filter,
                'sum': sum,
                'min': min,
                'max': max,
                'abs': abs,
                'round': round,
                'sorted': sorted,
                'reversed': reversed,
            }
        }
        
        # Execute the script
        exec(script, namespace)
        
        # Get the modified DataFrame
        result_df = namespace.get('df')
        
        if result_df is None or not isinstance(result_df, pd.DataFrame):
            return False, None, "Script must return a DataFrame in variable 'df'"
        
        # Convert result to Excel format
        output = io.BytesIO()
        result_df.to_excel(output, index=False, engine='openpyxl')
        output.seek(0)
        
        return True, output.getvalue(), ""
        
    except Exception as e:
        return False, None, f"Processing error: {str(e)}"

def lambda_handler(event: Dict, context: Any) -> Dict:
    """
    AWS Lambda handler function.
    """
    try:
        # Parse request body
        body = json.loads(event.get('body', '{}'))
        
        # Get file content (base64 encoded) and script
        file_content_b64 = body.get('file')
        script = body.get('script')
        
        if not file_content_b64 or not script:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing file or script'})
            }
        
        # Decode file content
        file_content = base64.b64decode(file_content_b64)
        
        # Process the file
        success, result, error = process_excel(file_content, script)
        
        if not success:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': error})
            }
        
        # Return processed file (base64 encoded)
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="processed_file.xlsx"'
            },
            'body': base64.b64encode(result).decode('utf-8'),
            'isBase64Encoded': True
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Internal server error: {str(e)}'})
        }

if __name__ == '__main__':
    # For local testing
    if len(sys.argv) > 2:
        with open(sys.argv[1], 'rb') as f:
            file_content = f.read()
        
        with open(sys.argv[2], 'r') as f:
            script = f.read()
        
        success, result, error = process_excel(file_content, script)
        
        if success:
            with open('output.xlsx', 'wb') as f:
                f.write(result)
            print("Success! Output saved to output.xlsx")
        else:
            print(f"Error: {error}")
    else:
        print("Usage: python process_excel.py <input_file.xlsx> <script.py>")
