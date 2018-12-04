import { EventItem } from './event';

export interface Calendar {
  color: string;
  summary: string;
  etag: string;
  items: EventItem[];
}
