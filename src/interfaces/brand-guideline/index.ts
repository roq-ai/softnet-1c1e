import { BrandalyzerInterface } from 'interfaces/brandalyzer';
import { GetQueryInterface } from 'interfaces';

export interface BrandGuidelineInterface {
  id?: string;
  pdf: string;
  brandalyzer_id?: string;
  created_at?: any;
  updated_at?: any;

  brandalyzer?: BrandalyzerInterface;
  _count?: {};
}

export interface BrandGuidelineGetQueryInterface extends GetQueryInterface {
  id?: string;
  pdf?: string;
  brandalyzer_id?: string;
}
