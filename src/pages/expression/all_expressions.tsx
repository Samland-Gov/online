"use client"

import { Blankslate, DataTable, Table } from '@primer/react/experimental'
import {
  Breadcrumbs,
  PageLayout,
  VisuallyHidden,
  BranchName,
  StateLabel
} from '@primer/react'
import { BookIcon } from '@primer/octicons-react';

import Link from 'next/link';
import { Expression, PointInTime } from '@/api/legislation/models';
import { getExpressionStatus } from '@/api/legislation/status';

export interface ExpressionRow {
  id: string;
  title: string;
  date: string;
  frbrUri: string;
  languageCode: string;
  href: string;
  state: () => React.ReactNode;
}

export interface ExpressionWithTime extends Expression {
  points_in_time: PointInTime[];
}

function convertToRows(expressions: ExpressionWithTime[]): ExpressionRow[] {
  const rows = [];
  if (expressions) {
    for (const expression of expressions) {
      const status = getExpressionStatus(expression.points_in_time || [], "small");
      rows.push({
        id: expression.frbrUri,
        title: expression.title,
        date: new Date(expression.date).toDateString(),
        frbrUri: expression.frbrUri,
        languageCode: expression.languageCode,
        href: `/expression${expression.frbrUri}`,
        state: () => status,
      })
    }
  }

  return rows;
}

export default function AllExpressionsPage({expressions, error}: {expressions: ExpressionWithTime[], error?: string}) {
  const rows = convertToRows(expressions);
  return (
    <>
      <PageLayout>
        <PageLayout.Content>
          <Breadcrumbs aria-label="Page navigation">
            <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/expression" selected>Legislation</Breadcrumbs.Item>
          </Breadcrumbs>
          <ExpressionTable rows={rows} error={error} />
        </PageLayout.Content>
      </PageLayout>
    </>
  );
}


const ExpressionTable = ({rows, error}: {rows: ExpressionRow[], error?: string}) => {
  return rows.length === 0 ? (
    <Blankslate border>
      <Blankslate.Visual>
        <BookIcon size="medium" />
      </Blankslate.Visual>
      <Blankslate.Heading>There is no legislation.</Blankslate.Heading>
      <Blankslate.Description>
        We were unable to find any legislation in Samland.
        <br/>
        {error}
      </Blankslate.Description>
      <Blankslate.PrimaryAction href="/">
        Go back to the homepage
      </Blankslate.PrimaryAction>
    </Blankslate>
  ) : (
    <Table.Container>
      <Table.Title as="h2" id="legislation">
        Samland Legislation
      </Table.Title>
      <Table.Subtitle as="p" id="legislation-subtitle">
        All active legislation in Samland
      </Table.Subtitle>
      <DataTable
        aria-labelledby="legislation"
        aria-describedby="legislation-subtitle"
        data={rows}
        columns={[
          {
            header: 'Title',
            field: 'title',
            rowHeader: true,
          },
          {
            id: 'status',
            header: () => "Status",
            renderCell: (row) => row.state(),
          },
          {
            header: 'Date created',
            field: 'date',
            renderCell: (row) => <>{new Date(row.date).toDateString()}</>,
          },
          {
            header: 'FRBR URI',
            field: 'frbrUri',
            renderCell: (row) => <BranchName href={row.href}>{row.frbrUri}</BranchName>,
          },
          {
            header: 'Language code',
            field: 'languageCode',
          },
          {
            id: 'actions',
            header: () => <VisuallyHidden>Actions</VisuallyHidden>,
            renderCell: (row) => {
              return (
                <Link href={row.href}>Open</Link>
              )
            },
          },
        ]}
      />
    </Table.Container>
  )
}