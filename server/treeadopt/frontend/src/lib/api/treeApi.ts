import { PaginationParams } from '@/interface/pagination.interface';
import { TreeType } from '@/types/tree.type';

import { api } from './api';

const treeApi = api['tree'];

export async function getTrees(paginationParams: PaginationParams) {
  const { withData, ...params } = paginationParams;
  const res = await treeApi.$get({
    query: { ...params, with: withData },
  });
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
}

export async function getTree(id: string, withData?: string) {
  const res = await treeApi[':id{[0-9]+}'].$get({
    param: { id },
    ...(withData ? { query: { with: withData } } : {}),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json() as Promise<{ data: TreeType }>;
}
