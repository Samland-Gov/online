"use client"

import { Expression } from '@/api/legislation/models';
import TableOfData from '@/components/TableOfData';
import {
  Content,
  Breadcrumb,
  BreadcrumbItem,
} from '@carbon/react';

const headers = [
  'Title',
  'Date created',
  'FRBR URI',
  'Language code',
];

function convertToCarbonRows(expressions: Expression[]) {
  const rows = [];
  for (const expression of expressions) {
    rows.push({
      id: expression.frbrUri,
      title: expression.title,
      date: new Date(expression.date).toDateString(),
      frbrUri: expression.frbrUri,
      languageCode: expression.languageCode,
      href: `/expression${expression.frbrUri}`
    })
  }

  return rows;
}

export default function AllExpressionsPage({expressions}: {expressions: Expression[]}) {
  const rows = convertToCarbonRows(expressions);
  return (
    <>
      <Content>
        <Breadcrumb noTrailingSlash aria-label="Page navigation">
          <BreadcrumbItem>
            <a href="/">Home</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/expression">Legislation</a>
          </BreadcrumbItem>
        </Breadcrumb>
        <TableOfData
          title='Samland Legislation'
          description='All active legislation in Samland'
          headers={headers}
          rows={rows}
        />
      </Content>
    </>
  );
}
