import { SurveyHistory } from '@server/app/handlers/surveyHistoryHandler';

import { TreeType } from './tree.type';
import { UserType } from './user.type';

export type SurveyHistoryType = SurveyHistory & {
  user: UserType | null;
  tree: TreeType | null;
};
