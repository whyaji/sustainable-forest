import { PaginationParams } from '@/interface/pagination.interface';
import { SurveyHistoryType } from '@/types/surveyHistory.type';

import { api } from './api';

const surveyHistoryApi = api['survey-history'];

export async function getSurveyHistories({
  search,
  page,
  limit,
  filter,
  withData,
  sortBy,
  order,
}: PaginationParams) {
  const res = await surveyHistoryApi.$get({
    query: { search, page, limit, with: withData, filter, sortBy, order },
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function getSurveyHistory(id: string, withData?: string) {
  const res = await surveyHistoryApi[':id{[0-9]+}'].$get({
    param: { id },
    ...(withData ? { query: { with: withData } } : {}),
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json() as Promise<{ data: SurveyHistoryType }>;
}
