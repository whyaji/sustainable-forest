import { Tree } from '@server/app/handlers/treeHandler';

import { AdoptHistoryType } from './adoptHistory.type';
import { KelompokKomunitasType } from './kelompokKomunitas.type';
import { MasterLocalTreeType, MasterTreeType } from './masterTree.type';
import { SurveyHistoryType } from './surveyHistory.type';
import { UserType } from './user.type';

export type TreeType = Tree & {
  kelompokKomunitas?: KelompokKomunitasType | null;
  surveyor?: UserType | null;
  masterTree?: MasterTreeType | null;
  masterLocalTree?: MasterLocalTreeType[] | null;
  surveyHistory?: SurveyHistoryType[] | null;
  survey?: SurveyHistoryType | null;
  adoptHistory?: AdoptHistoryType[] | null;
  adopter?: AdoptHistoryType | null;
};
