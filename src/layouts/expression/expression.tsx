"use client"

import {
  Breadcrumbs,
  PageLayout,
  VisuallyHidden,
  BranchName,
  Box,
  Text,
  Heading,
  StateLabel,
  Link
} from '@primer/react'
import { BookIcon } from '@primer/octicons-react';
import { TabNav } from '@primer/react/deprecated';

import { Expression, PointInTime } from '@/api/legislation/models';

import TableOfContents from './contents';
import { getExpressionStatus, getBanner } from '@/api/legislation/status';

export default function ExpressionPage({expression, points_in_time}: {expression: Expression, points_in_time: PointInTime[]}) {
  if (expression) {
    const tocJson = expression.tocJson.toc;
    return (
      <>
        <PageLayout>
          <PageLayout.Header>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <Box>
                <Breadcrumbs aria-label="Page navigation">
                  <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
                  <Breadcrumbs.Item href="/expression">Legislation</Breadcrumbs.Item>
                  <Breadcrumbs.Item href={`/expression/${expression.frbrUri}`} selected>{expression.title}</Breadcrumbs.Item>
                </Breadcrumbs>
                <Heading
                  as="h1"
                  sx={{
                    fontWeight: 'normal',
                  }}
                >
                  {expression.title}{' '}
                  <Text
                    sx={{
                      color: 'fg.muted',
                      fontWeight: 'light',
                    }}
                  >
                    {expression.frbrUri}
                  </Text>
                </Heading>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                  }}
                >
                  {getExpressionStatus(points_in_time)}
                </Box>
              </Box>
              <TabNav>
                <TabNav.Link href={`/expression/${expression.frbrUri}`} selected>
                  Content
                </TabNav.Link>
                <TabNav.Link href={`/expression/history${expression.frbrUri}`}>History</TabNav.Link>
              </TabNav>
            </Box>
          </PageLayout.Header>
          <PageLayout.Content>
            {getBanner(points_in_time)}
            <Box
              sx={{
                maxWidth: '100%',
                overflowX: 'auto',
                border: '1px solid',
                borderColor: 'border.default',
                mt: 3,
                p: 3,
                borderRadius: 2,
              }}
              tabIndex={0}
            >
              <la-decorate-terms popup-definitions link-terms/>
              <la-decorate-internal-refs popups flag/>
              <la-akoma-ntoso frbr-expression-uri={ expression?.frbrUri } dangerouslySetInnerHTML={{ __html: expression.content }}/>
            </Box>
          </PageLayout.Content>
          <PageLayout.Pane>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <TableOfContents label='Table of contents' data={tocJson} base_url={`/expression/${expression.frbrUri}/#`}></TableOfContents>
            </Box>
          </PageLayout.Pane>
        </PageLayout>
      </>
    );
  }
  return (
    <>
    </>
  );
}
