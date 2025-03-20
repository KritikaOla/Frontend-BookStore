import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

// Define table columns
const columns = [
  { width: 200, label: 'Book', dataKey: 'bookName' },
  { width: 100, label: 'Quantity', dataKey: 'quantity', numeric: true },
  { width: 100, label: 'Cost', dataKey: 'cost', numeric: true },
  { width: 150, label: 'Total', dataKey: 'total', numeric: true },
  { width: 150, label: 'Order Date', dataKey: 'dateOfPurchase' },
];

// Virtuoso table components for virtualization
const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

// Header for the table
function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

// Row content for each table row
function rowContent(_index, row) {
  return (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? 'right' : 'left'}
        >
          {column.dataKey === 'total'
            ? (row.cost * row.quantity).toFixed(2) // Calculate total cost
            : column.dataKey === 'dateOfPurchase'
            ? new Date(row[column.dataKey]).toLocaleDateString() // Format date
            : row[column.dataKey]}
        </TableCell>
      ))}
    </>
  );
}

// Main component exported from Orders.js
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found, please login again.");
        }
  
        console.log("Fetching orders with token:", token); // Debug log
  
        const response = await axios.get("http://localhost:5197/api/Purchase/user-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Orders fetched successfully:", response.data); // Debug log
  
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        setError(error.response?.data || "Failed to fetch orders. Please try again.");
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Orders</h2>
      <Paper style={{ height: 500, width: '100%' }}>
        <TableVirtuoso
          data={orders}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </div>
  );
}