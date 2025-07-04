import { AdoptHistory } from '@parentServer/app/handlers/adoptHistoryHandler';

import { TreeType } from './tree.type';
import { UserType } from './user.type';
export type AdoptHistoryType = AdoptHistory & {
  user: UserType | null;
  tree: TreeType | null;
};
