import { PaginationParams, PaginationParamsOptional } from '@/interface/pagination.interface';
import { MasterLocalTreeType, MasterTreeType } from '@/types/masterTree.type';

import { api } from './api';

const masterTreeApi = api['master-tree'];

export async function getMasterTrees({
  search,
  page,
  limit,
  filter,
  withData,
  sortBy,
  order,
}: PaginationParams) {
  const res = await masterTreeApi['actual'].$get({
    query: { search, page, limit, with: withData, filter, sortBy, order },
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function getMasterTree(id: string, withData?: string) {
  const res = await masterTreeApi[':id{[0-9]+}'].$get({
    param: { id },
    ...(withData ? { query: { with: withData } } : {}),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json() as Promise<{ data: MasterTreeType }>;
}

export async function getMasterTreeLocals(paginationParams: PaginationParamsOptional) {
  const { withData, ...params } = paginationParams;
  const res = await masterTreeApi['local'].$get({
    query: { ...params, with: withData },
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function getMasterTreeLocal(id: string, withData?: string) {
  const res = await masterTreeApi['local'][':id{[0-9]+}'].$get({
    param: { id },
    ...(withData ? { query: { with: withData } } : {}),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json() as Promise<{ data: MasterLocalTreeType }>;
}
