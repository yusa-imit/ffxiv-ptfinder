import { AnnounceSummary } from '../../type/data/AnnounceData';

interface BeforeSummarizedAnnounce extends AnnounceSummary {
  description?: string;
}

export function summarizeAnnounce(before: BeforeSummarizedAnnounce): AnnounceSummary {
  const newAnnounce = { ...before };
  if (newAnnounce.description) delete newAnnounce.description;
  return newAnnounce;
}
