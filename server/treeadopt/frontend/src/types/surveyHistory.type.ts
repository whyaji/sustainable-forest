import { SurveyHistory } from '@parentServer/app/handlers/surveyHistoryHandler';

import { TreeType } from './tree.type';
import { WorkerType } from './user.type';

export type SurveyHistoryType = SurveyHistory & {
  user: WorkerType | null;
  tree: TreeType | null;
};
