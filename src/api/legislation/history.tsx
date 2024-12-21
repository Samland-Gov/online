import {
  StateLabel,
  Link
} from '@primer/react'

import { Amendment, ParentWork, PointInTime, Publication } from '@/api/legislation/models';

export function getPointInTimeDescription(point: PointInTime, base_url: string): React.ReactNode {
  switch (point.type) {
    case 'publication':
      const publication = point.linkedObject as Publication;
      return `Published on ${publication.date.toDateString()} in ${publication.name} (No. ${publication.number})`;
    case 'commencement':
      return `Commenced on ${point.date.toDateString()}`;
    case 'assent':
      return `Assented on ${point.date.toDateString()}`;
    case 'amendment':
      const amendment = point.linkedObject as Amendment;
      return <>Amended by <Link href={base_url+amendment.amending_uri}>{amendment.amending_title}</Link> on {new Date(amendment.date).toDateString()}</>;
    case 'amended':
      const amended = point.linkedObject as ParentWork;
      return <>Amends <Link href={base_url+amended.frbr_uri}>{amended.title}</Link> on {new Date(point.date).toDateString()}</>;
    default:
      return `Event on ${point.date.toDateString()}`;
  }
}

export function getPointInTimeIcon(point: PointInTime): React.ReactNode {
  switch (point.type) {
    case 'publication':
      return <StateLabel status="draft"/>;
    case 'commencement':
      return <StateLabel status="pullOpened"/>;
    case 'assent':
      return <StateLabel status="draft"/>;
    case 'amendment':
      return <StateLabel status="pullMerged"/>;
    case 'amended':
      return <StateLabel status="pullMerged"/>;
    default:
      return <StateLabel status="unavailable"/>;
  }
}
