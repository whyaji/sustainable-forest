import { PaginationParams } from '@/interface/pagination.interface';

import { api } from './api';

const wishTreeApi = api['wishtree'];

export async function getMyWishtrees(paginationParams: PaginationParams) {
  const { withData, ...params } = paginationParams;
  const res = await wishTreeApi.me.$get({
    query: { ...params, with: withData },
  });
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
}

export async function addToMyWishtree(treeId: number) {
  const res = await wishTreeApi.me.$post({
    json: { treeId },
  });
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
}

export async function deleteMyWishtree(treeIds: number[]) {
  const res = await wishTreeApi.me.multiple.$delete({
    json: { treeIds },
  });
  if (!res.ok) throw new Error(res.statusText);
  return await res.json();
}
