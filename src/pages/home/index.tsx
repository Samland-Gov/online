"use client";

import { InfoCard, InfoSection } from '@/components/Info/Info';
import {
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  Column,
  Content,
} from '@carbon/react';
import {
  Advocate,
  Globe,
  Documentation,
  Warning_01,
  AcceleratingTransformation,
} from '@carbon/pictograms-react';

import Image from 'next/image';
import { GraphTilesContainer, GraphTile } from '@/components/GraphTile/GraphTile';

export default function HomePage() {
  return (
    <>
      <div className='home-page'>
        <Content>
          <Grid className="landing-page" fullWidth>
            <Column lg={16} md={8} sm={4} className="landing-page__banner">
              <Breadcrumb noTrailingSlash aria-label="Page navigation">
                <BreadcrumbItem>
                  <a href="/">Home</a>
                </BreadcrumbItem>
              </Breadcrumb>
              <h1 className="landing-page__heading">Welcome to Samland!</h1>
              <p className="landing-page__description">The official home of the Samland Government.</p>
            </Column>
            <Column lg={16} md={8} sm={4} className="landing-page__r2">
              <Grid className="tabs-group-content">
                <Column md={4} lg={7} sm={4} className="landing-page__tab-content">
                  <h3 className="landing-page__subheading">What is Samland?</h3>
                  <p className="landing-page__p">
                    Samland is a virtual micronation that has existed since 2017
                    and was founded by <a href='https://github.com/ajh123'>Samuel Hulme</a>.
                  </p>
                  <p className="landing-page__p">
                    The initial purpose of Samland was to experiment with creating legislation and
                    learn how countries work, however, the range of ideas have grown.
                  </p>
                  <p className="landing-page__p">
                    You can visit Samland by joining the <a href='https://www.minersonline.uk/docs/minecraft-server'>Miners Online Minecraft Server</a>.
                  </p>
                </Column>
                <Column md={4} lg={{ span: 8, offset: 7 }} sm={4}>
                  <Image
                    className="landing-page__illo"
                    src="https://raw.githubusercontent.com/Samland-Gov/.github/90e1aaa159f56aa471bfdf9e38b038bb1f0f887e/flag.svg"
                    alt="Samland Flag"
                    width={360}
                    height={240}
                  />
                </Column>
              </Grid>
            </Column>
            <Column lg={16} md={8} sm={4} className="landing-page__r3">
              <InfoSection heading="The Principles">
                <InfoCard
                  heading="Samland is Inclusive"
                  body="Ensuring equal opportunities and fair representation for all citizens, virtual or real."
                  icon={() => <Advocate/>}
                />
                <InfoCard
                  heading="Samland is Innovative"
                  body="Embracing creativity and digital advancement to shape a dynamic, forward-thinking nation."
                  icon={() => <AcceleratingTransformation/>}
                />
                <InfoCard
                  heading="Samland is Sustainable"
                  body="Committed to responsible growth and long-term environmental and social well-being."
                  icon={() => <Globe/>}
                />
              </InfoSection>
            </Column>
            <Column lg={16} md={8} sm={4} className="landing-page__r2">
              <div className="tabs-group-content">
                <div className="landing-page__tab-content">
                  <h3 className="landing-page__subheading">More resources</h3>
                  <GraphTilesContainer>
                    <GraphTile
                      title="Legislation"
                      href="/expression"
                      icon={() => <Documentation className='graph-tile-svg'/>}
                    />
                    <GraphTile
                      title="Alerts"
                      href="/alerts"
                      icon={() => <Warning_01 className='graph-tile-svg'/>}
                    />
                  </GraphTilesContainer>
                </div>
              </div>
            </Column>
          </Grid>
        </Content>
      </div>
    </>
  );
}
