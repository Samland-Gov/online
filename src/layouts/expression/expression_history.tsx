"use client"

import {
  Breadcrumbs,
  PageLayout,
  Box,
  Text,
  Heading,
  Timeline,
} from '@primer/react'
import {  TabNav } from '@primer/react/deprecated';

import { Expression, PointInTime } from '@/api/legislation/models';
import { getPointInTimeDescription, getPointInTimeIcon } from '@/api/legislation/history';
import { getExpressionStatus } from '@/api/legislation/status';

export default function ExpressionHistory({expression, points_in_time}: {expression: Expression, points_in_time: PointInTime[]}) {
  if (expression) {
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
                <TabNav.Link href={`/expression/${expression.frbrUri}`}>
                  Content
                </TabNav.Link>
                <TabNav.Link href={`/expression/history${expression.frbrUri}`} selected>History</TabNav.Link>
              </TabNav>
            </Box>
          </PageLayout.Header>
          <PageLayout.Content>
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
              <Timeline>
                {points_in_time.map((point, index) => (
                  <Timeline.Item key={index}>
                    <Timeline.Badge>
                      {getPointInTimeIcon(point)}
                    </Timeline.Badge>
                    <Timeline.Body>
                      <Text>{getPointInTimeDescription(point, "/expression/history")}</Text>
                    </Timeline.Body>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Box>
          </PageLayout.Content>
        </PageLayout>
      </>
    );
  }
  return (
    <>
    </> 
  );
}
