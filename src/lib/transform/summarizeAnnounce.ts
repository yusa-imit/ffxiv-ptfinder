import { AnnounceSummary } from '../../type/data/AnnounceData';

interface BeforeSummarizedAnnounce extends AnnounceSummary {
  description?: string;
}

export function summarizeAnnounce(before: BeforeSummarizedAnnounce): AnnounceSummary {
  const { description, ...summarized } = before;
  return summarized;
}
