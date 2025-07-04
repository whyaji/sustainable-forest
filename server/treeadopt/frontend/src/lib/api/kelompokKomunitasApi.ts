import { PaginationParams } from '@/interface/pagination.interface';

import { api } from './api';
import { KelompokKomunitasType } from '@/types/kelompokKomunitas.type';

const kelompokKomunitasApi = api['kelompok-komunitas'];

export async function getKelompokKomunitas({
  search,
  page,
  limit,
  filter,
  withData,
  sortBy,
  order,
}: PaginationParams) {
  const res = await kelompokKomunitasApi.$get({
    query: { search, page, limit, with: withData, filter, sortBy, order },
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function getKelompokKomunitasById(id: string, withData?: string) {
  const res = await kelompokKomunitasApi[':id{[0-9]+}'].$get({
    param: { id },
    ...(withData ? { query: { with: withData } } : {}),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json() as Promise<{ data: KelompokKomunitasType }>;
}

export async function getKelompokKomunitasByName(name: string, withData?: string) {
  const res = await kelompokKomunitasApi['by-name'][':name'].$get({
    param: { name },
    ...(withData ? { query: { with: withData } } : {}),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json() as Promise<{ data: KelompokKomunitasType }>;
}
