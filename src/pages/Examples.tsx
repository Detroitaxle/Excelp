import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Code, ArrowLeft, Copy } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Examples() {
  const examples = [
    {
      title: 'Sales Data Analysis',
      description: 'Calculate total revenue, filter high-value transactions, and add profit margins',
      code: `# Calculate total revenue
df['Revenue'] = df['Price'] * df['Quantity']

# Filter transactions over $1000
df = df[df['Revenue'] > 1000]

# Add 30% profit margin
df['Profit'] = df['Revenue'] * 0.30

# Sort by revenue (highest first)
df = df.sort_values('Revenue', ascending=False)

df`,
      useCase: 'E-commerce, Retail'
    },
    {
      title: 'Employee Data Cleaning',
      description: 'Clean employee records, standardize names, and calculate age from birth dates',
      code: `import pandas as pd
from datetime import datetime

# Remove duplicates
df = df.drop_duplicates(subset=['Employee_ID'])

# Standardize names (Title Case)
df['Name'] = df['Name'].str.title()

# Clean email addresses (lowercase)
df['Email'] = df['Email'].str.lower().str.strip()

# Calculate age from birth date
df['Birth_Date'] = pd.to_datetime(df['Birth_Date'])
df['Age'] = (datetime.now() - df['Birth_Date']).dt.days // 365

# Remove incomplete records
df = df.dropna(subset=['Name', 'Email', 'Department'])

df`,
      useCase: 'HR, Payroll'
    },
    {
      title: 'Student Grade Analysis',
      description: 'Calculate final grades, determine pass/fail status, and rank students',
      code: `# Calculate weighted final grade
df['Final_Grade'] = (
    df['Midterm'] * 0.30 +
    df['Final_Exam'] * 0.40 +
    df['Homework'] * 0.20 +
    df['Participation'] * 0.10
)

# Determine pass/fail (60% passing)
df['Status'] = df['Final_Grade'].apply(
    lambda x: 'Pass' if x >= 60 else 'Fail'
)

# Assign letter grades
def assign_grade(score):
    if score >= 90: return 'A'
    elif score >= 80: return 'B'
    elif score >= 70: return 'C'
    elif score >= 60: return 'D'
    else: return 'F'

df['Letter_Grade'] = df['Final_Grade'].apply(assign_grade)

# Rank students
df['Rank'] = df['Final_Grade'].rank(ascending=False, method='min')

# Sort by rank
df = df.sort_values('Rank')

df`,
      useCase: 'Education, Training'
    },
    {
      title: 'Inventory Management',
      description: 'Flag low stock items, calculate reorder points, and value inventory',
      code: `# Calculate inventory value
df['Inventory_Value'] = df['Units_In_Stock'] * df['Unit_Price']

# Flag low stock items (below 20 units)
df['Low_Stock'] = df['Units_In_Stock'] < 20

# Calculate reorder point (2 weeks of average daily sales)
df['Reorder_Point'] = df['Avg_Daily_Sales'] * 14

# Flag items needing reorder
df['Needs_Reorder'] = df['Units_In_Stock'] < df['Reorder_Point']

# Calculate days of stock remaining
df['Days_Until_Stockout'] = df['Units_In_Stock'] / df['Avg_Daily_Sales']

# Sort by urgency (least days remaining first)
df = df.sort_values('Days_Until_Stockout')

df`,
      useCase: 'Retail, Warehouse'
    },
    {
      title: 'Financial Report Consolidation',
      description: 'Aggregate financial data by department and calculate year-over-year growth',
      code: `# Group by department and sum amounts
summary = df.groupby('Department').agg({
    'Revenue_2023': 'sum',
    'Revenue_2024': 'sum',
    'Expenses_2023': 'sum',
    'Expenses_2024': 'sum'
}).reset_index()

# Calculate profit
summary['Profit_2023'] = summary['Revenue_2023'] - summary['Expenses_2023']
summary['Profit_2024'] = summary['Revenue_2024'] - summary['Expenses_2024']

# Calculate year-over-year growth
summary['Revenue_Growth_%'] = (
    (summary['Revenue_2024'] - summary['Revenue_2023']) / 
    summary['Revenue_2023'] * 100
).round(2)

summary['Profit_Growth_%'] = (
    (summary['Profit_2024'] - summary['Profit_2023']) / 
    summary['Profit_2023'] * 100
).round(2)

# Sort by 2024 profit
df = summary.sort_values('Profit_2024', ascending=False)

df`,
      useCase: 'Finance, Accounting'
    },
    {
      title: 'Customer Segmentation',
      description: 'Segment customers by purchase behavior and lifetime value',
      code: `# Calculate customer metrics
customer_summary = df.groupby('Customer_ID').agg({
    'Order_ID': 'count',
    'Total_Amount': 'sum',
    'Order_Date': ['min', 'max']
}).reset_index()

customer_summary.columns = [
    'Customer_ID', 'Total_Orders', 'Total_Spent', 
    'First_Purchase', 'Last_Purchase'
]

# Calculate average order value
customer_summary['Avg_Order_Value'] = (
    customer_summary['Total_Spent'] / customer_summary['Total_Orders']
).round(2)

# Segment customers
def segment_customer(row):
    if row['Total_Spent'] > 10000 and row['Total_Orders'] > 20:
        return 'VIP'
    elif row['Total_Spent'] > 5000 and row['Total_Orders'] > 10:
        return 'High Value'
    elif row['Total_Spent'] > 1000:
        return 'Regular'
    else:
        return 'Occasional'

customer_summary['Segment'] = customer_summary.apply(segment_customer, axis=1)

# Sort by total spent
df = customer_summary.sort_values('Total_Spent', ascending=False)

df`,
      useCase: 'Marketing, CRM'
    }
  ];

  const copyToClipboard = (code: string, title: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`${title} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="h-8 w-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900">Script Examples</h1>
            </div>
            <p className="text-lg text-gray-600">
              Ready-to-use Python scripts for common Excel processing tasks. Click the copy button to use any example.
            </p>
          </div>

          <div className="grid gap-6">
            {examples.map((example, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{example.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{example.description}</p>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {example.useCase}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(example.code, example.title)}
                      className="flex items-center space-x-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <pre className="text-sm font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap">
                      {example.code}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h3>
            <p className="text-blue-800 text-sm">
              These examples are starting points. Modify them to match your specific column names and requirements. 
              You can also combine multiple examples to create more complex data transformations.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
