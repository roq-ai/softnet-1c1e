import { BrandalyzerInterface } from 'interfaces/brandalyzer';
import { GetQueryInterface } from 'interfaces';

export interface InvitationInterface {
  id?: string;
  email: string;
  brandalyzer_id?: string;
  created_at?: any;
  updated_at?: any;

  brandalyzer?: BrandalyzerInterface;
  _count?: {};
}

export interface InvitationGetQueryInterface extends GetQueryInterface {
  id?: string;
  email?: string;
  brandalyzer_id?: string;
}
