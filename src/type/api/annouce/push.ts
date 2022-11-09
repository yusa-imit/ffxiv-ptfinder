import { PreDBAnnouceData } from '../../data/AnnounceData';

export interface PushAnnounceBodyType {
  data: PreDBAnnouceData;
}

export interface PushAnnounceReturnType {
  destination: string;
  message: string;
}
