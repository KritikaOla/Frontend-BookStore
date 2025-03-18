// src/pages/Orders.js

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Chance from 'chance';

// Initialize Chance for generating fake data
const chance = new Chance(42);

// Define possible order statuses
const orderStatuses = ['Delivered', 'Cancelled', 'Returned'];

// Function to create a single row of fake order data
function createData(id) {
  return {
    id,
    book: chance.sentence({ words: 3 }), // Random 3-word book title
    author: chance.name(),               // Random author name
    quantity: chance.integer({ min: 1, max: 20 }), // Random quantity between 1-20
    status: chance.pickone(orderStatuses), // Random order status
    orderDate: chance.date({ year: 2024 }).toLocaleDateString(), // Random date in 2024
  };
}

// Define table columns
const columns = [
  { width: 200, label: 'Book', dataKey: 'book' },
  { width: 150, label: 'Author', dataKey: 'author' },
  { width: 100, label: 'Quantity', dataKey: 'quantity', numeric: true },
  { width: 130, label: 'Order Status', dataKey: 'status' },
  { width: 130, label: 'Order Date', dataKey: 'orderDate' },
];

// Create an array of rows (fake orders)
const rows = Array.from({ length: 200 }, (_, index) => createData(index));

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
          {row[column.dataKey]}
        </TableCell>
      ))}
    </>
  );
}

// Main component exported from Orders.js
export default function Orders() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Orders</h2>
      <Paper style={{ height: 500, width: '100%' }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </div>
  );
}
