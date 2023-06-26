import axios from 'axios';
import queryString from 'query-string';
import { BrandGuidelineInterface, BrandGuidelineGetQueryInterface } from 'interfaces/brand-guideline';
import { GetQueryInterface } from '../../interfaces';

export const getBrandGuidelines = async (query?: BrandGuidelineGetQueryInterface) => {
  const response = await axios.get(`/api/brand-guidelines${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBrandGuideline = async (brandGuideline: BrandGuidelineInterface) => {
  const response = await axios.post('/api/brand-guidelines', brandGuideline);
  return response.data;
};

export const updateBrandGuidelineById = async (id: string, brandGuideline: BrandGuidelineInterface) => {
  const response = await axios.put(`/api/brand-guidelines/${id}`, brandGuideline);
  return response.data;
};

export const getBrandGuidelineById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/brand-guidelines/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBrandGuidelineById = async (id: string) => {
  const response = await axios.delete(`/api/brand-guidelines/${id}`);
  return response.data;
};
