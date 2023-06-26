import axios from 'axios';
import queryString from 'query-string';
import { BrandalyzerInterface, BrandalyzerGetQueryInterface } from 'interfaces/brandalyzer';
import { GetQueryInterface } from '../../interfaces';

export const getBrandalyzers = async (query?: BrandalyzerGetQueryInterface) => {
  const response = await axios.get(`/api/brandalyzers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBrandalyzer = async (brandalyzer: BrandalyzerInterface) => {
  const response = await axios.post('/api/brandalyzers', brandalyzer);
  return response.data;
};

export const updateBrandalyzerById = async (id: string, brandalyzer: BrandalyzerInterface) => {
  const response = await axios.put(`/api/brandalyzers/${id}`, brandalyzer);
  return response.data;
};

export const getBrandalyzerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/brandalyzers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBrandalyzerById = async (id: string) => {
  const response = await axios.delete(`/api/brandalyzers/${id}`);
  return response.data;
};
