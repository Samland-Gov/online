"use client";

import { PageLayout } from '@primer/react'

type HomeProps = {
  content: string
}

export default function HomePage({ content }: HomeProps) {
  return (
    <PageLayout>
      <PageLayout.Content>
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: content }}/>
      </PageLayout.Content>
    </PageLayout>
  );
}
