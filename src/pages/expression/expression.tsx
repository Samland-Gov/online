"use client"

import { Expression } from '@/api/legislation/models';
import {
  Content,
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  Column,
} from '@carbon/react';

import TableOfContents from './contents';
import Link from 'next/link';

export default function ExpressionPage({expression}: {expression: Expression}) {
  if (expression) {
    const tocJson = expression.tocJson.toc;
    return (
      <>
        <div className='home-page'>
          <Content>
            <Grid className="landing-page" fullWidth>
              <Column lg={16} md={8} sm={4} className="landing-page__banner">
                <Breadcrumb noTrailingSlash aria-label="Page navigation">
                  <BreadcrumbItem>
                    <Link href="/">Home</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Link href="/expression">Legislation</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Link href={`/expression/${expression.frbrUri}`}>{expression.title}</Link>
                  </BreadcrumbItem>
                </Breadcrumb>
                <h1 className="landing-page__heading">{expression.title}</h1>
              </Column>
              <Column lg={16} md={8} sm={4} className="landing-page__r2">
                <Grid className="tabs-group-content">
                  <Column md={4} lg={7} sm={4} className="landing-page__tab-content">
                    <TableOfContents label='Table of contents' data={tocJson}></TableOfContents>
                  </Column>
                  <Column md={4} lg={7} sm={4}>
                    <la-decorate-terms popup-definitions link-terms/>
                    <la-decorate-internal-refs popups flag/>
                    <la-akoma-ntoso frbr-expression-uri={ expression?.frbrUri } dangerouslySetInnerHTML={{ __html: expression.content }}/>
                  </Column>
                </Grid> 
              </Column>
            </Grid>
          </Content>
        </div>
      </>
    );
  }
  return (
    <>
    </>
  );
}
