import { AnnounceData, AnnounceSummary } from '../../data/AnnounceData';

export interface GetAnnounceQueryType {
  id?: string;
  page?: string;
  number?: string;
  s?: string;
}

export interface GetAnnounceReturnType {
  message: string;
  error?: Error;
  data: AnnounceData;
}

export interface GetAnnounceBulkReturnType {
  message: string;
  error?: Error;
  data: AnnounceSummary[];
}
