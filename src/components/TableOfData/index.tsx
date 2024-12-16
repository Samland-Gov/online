'use client';

import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer
} from '@carbon/react';
import { useRouter } from 'next/navigation';

interface TableOfDataProps {
  headers: string[]; // Array of header names
  rows: Array<{
    id: string;
    href?: string;
    [key: string]: string | number | undefined;
  }>; // Rows must include an `id` and any other fields as key-value pairs
  title: string;
  description: string;
}

const TableOfData = ({ rows, headers, title, description }: TableOfDataProps) => {
  const router = useRouter();
  const handleRowClick = (link?: string) => {
    if (link) {
      router.push(link); // Navigate to the link
    }
  };

  return (
    <TableContainer
      title={title}
      description={description}
    >
      <Table size="lg" useZebraStyles={false}>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader id={header} key={header}>
                {header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => handleRowClick(row.href)}
              onTouchStart={() => handleRowClick(row.href)}
              style={{
                cursor: row.href ? 'pointer' : 'default', // Pointer cursor for rows with links
              }}
            >
              {Object.keys(row)
                .filter((key) => key !== 'id' && key !== 'href') // Exclude `id` and `href`
                .map((key) => (
                  <TableCell key={key}>{row[key]}</TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOfData;
