# Excel Script Processor

A modern web application for processing Excel files with Python scripts. Upload your Excel files, write custom Python scripts using pandas, and download the processed results.

## Features

✨ **Easy File Upload** - Drag and drop Excel files (.xlsx, .xls) up to 50MB

📊 **Data Preview** - View your Excel data before processing

🐍 **Python Scripts** - Use pandas to transform your data with custom Python scripts

📝 **Script Templates** - Pre-built templates for common operations:
- Data filtering and sorting
- Calculated columns
- Statistical analysis
- Data cleaning
- Grouping and aggregation
- Pivot tables

📚 **Documentation** - Comprehensive guides and examples

📜 **Processing History** - Track your recent file processing activities

🔒 **Security** - Input validation and sandboxed script execution

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **Routing**: React Router
- **Backend**: Vercel Serverless Functions
- **Processing**: Python with pandas (for actual implementation)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- (Optional) Python 3.8+ for local backend development

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/excel-script-processor.git
cd excel-script-processor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Usage

1. **Upload Excel File** - Drag and drop or select your Excel file
2. **Preview Data** - Review your data in the preview table
3. **Write Script** - Create a Python script or use a template
4. **Process** - Click "Process File" to run your script
5. **Download** - Download the processed Excel file

### Example Scripts

#### Filter and Sort
```python
# Filter rows where Age > 30
df = df[df['Age'] > 30]

# Sort by Salary (descending)
df = df.sort_values('Salary', ascending=False)

df
```

#### Add Calculated Column
```python
# Calculate total revenue
df['Revenue'] = df['Price'] * df['Quantity']

# Add 30% profit margin
df['Profit'] = df['Revenue'] * 0.30

df
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### Environment Variables

No environment variables required for basic deployment.

For production Python processing, you'll need to set up:
- A separate Python microservice (AWS Lambda, Google Cloud Functions, etc.)
- Update the API endpoint in the frontend

## Project Structure

```
excel-script-processor/
├── api/                    # Serverless API functions
│   ├── process.ts         # Main processing endpoint
│   └── process_excel.py   # Python processing script
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── FileUpload.tsx
│   │   ├── ScriptEditorEnhanced.tsx
│   │   ├── DataPreview.tsx
│   │   └── ...
│   └── pages/            # Page components
│       ├── Home.tsx
│       ├── Documentation.tsx
│       └── Examples.tsx
├── App.tsx               # Main app component
├── index.tsx            # Entry point
└── vercel.json          # Vercel configuration
```

## Security Considerations

⚠️ **Important**: The current implementation includes basic security measures:

- File size limits (50MB)
- File type validation
- Basic script validation (blocks dangerous operations)
- Sandboxed execution environment (when properly implemented)

For production use, ensure:
- Proper input sanitization
- Rate limiting
- User authentication
- Secure script execution in isolated containers
- No access to file system or network from scripts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ by [Samuel]
