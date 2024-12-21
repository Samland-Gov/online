import {
  Link,
  StateLabel,
} from '@primer/react'

import {
  Banner
} from '@primer/react/experimental'

import { Amendment, PointInTime } from '@/api/legislation/models';

export function getExpressionStatus(points_in_time: PointInTime[], variant: string = "normal"): React.ReactNode {
  const current = points_in_time[0];
  switch (current.type) {
    case 'publication':
      return <StateLabel status="draft" variant={variant}>Published</StateLabel>;
    case 'commencement':
      return <StateLabel status="pullOpened" variant={variant}>Commenced</StateLabel>;
    case 'assent':
      return <StateLabel status="draft" variant={variant}>Assented</StateLabel>;
    case 'amendment':
      return <StateLabel status="pullMerged" variant={variant}>Amended</StateLabel>;
    case 'amended':
      return <StateLabel status="pullMerged" variant={variant}>Amends</StateLabel>;
    case 'repealed':
      return <StateLabel status="pullClosed" variant={variant}>Repealed</StateLabel>;
    default:
      return <StateLabel status="unavailable" variant={variant}>Unknown status</StateLabel>;
  }
}

export function getBanner(points_in_time: PointInTime[]): React.ReactNode {
  const current = points_in_time[0];
  const obj = current.linkedObject as Amendment;
  switch (current.type) {
    case 'amendment':
      return (
        <Banner
          variant="critical"
          title="Outdated legislation"
          description={
            <>
              You are viewing legislation which has since been amended.
              <br/>
              See <Link href={`/expression`+obj.amending_uri}>{obj.amending_title}</Link> for the next version.
            </>
          }
        />
      );
    default:
      return <></>;
  }
}