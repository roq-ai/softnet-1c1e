import { BrandGuidelineInterface } from 'interfaces/brand-guideline';
import { InvitationInterface } from 'interfaces/invitation';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BrandalyzerInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  brand_guideline?: BrandGuidelineInterface[];
  invitation?: InvitationInterface[];
  user?: UserInterface;
  _count?: {
    brand_guideline?: number;
    invitation?: number;
  };
}

export interface BrandalyzerGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
