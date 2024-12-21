"use client";

import {
  PageLayout,
  Box,
  Breadcrumbs,
  Heading
} from '@primer/react'
import { AlertFillIcon } from '@primer/octicons-react';
import { Blankslate } from '@primer/react/experimental'

type AlertsProps = {
  content: string
}

export default function AlertsPage({ content }: AlertsProps) {
  return (
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
              <Breadcrumbs.Item href="/alerts" selected>Alerts</Breadcrumbs.Item>
            </Breadcrumbs>
            <Heading
              as="h1"
              sx={{
                fontWeight: 'normal',
              }}
            >
              Alerts
            </Heading>
          </Box>
        </Box>
      </PageLayout.Header>
      <PageLayout.Content>
        <Blankslate border>
          <Blankslate.Visual>
            <AlertFillIcon size="medium" />
          </Blankslate.Visual>
          <Blankslate.Heading>There are no alerts.</Blankslate.Heading>
          <Blankslate.Description>
            There are no active alerts at the moment.
          </Blankslate.Description>
          <Blankslate.PrimaryAction href="/">
            Go back to the homepage
          </Blankslate.PrimaryAction>
        </Blankslate>
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
          <div className='markdown-body' dangerouslySetInnerHTML={{ __html: content }}/>
        </Box>
      </PageLayout.Content>
    </PageLayout>
  );
}
