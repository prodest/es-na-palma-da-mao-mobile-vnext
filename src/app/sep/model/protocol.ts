import { ProtocolUpdate } from './protocol-update';

export interface Protocol {
  number: string;
  parts: string[];
  subject: string;
  summary: string;
  status: string;
  updates: ProtocolUpdate[];
  district: string;
  extra: string;
  pageUrl: string;
}
