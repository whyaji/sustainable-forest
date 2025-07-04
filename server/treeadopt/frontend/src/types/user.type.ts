import { User } from '@server/routes/auth';
import { User as UserSever } from '@parentServer/routes/auth';

export type UserType = User;
export type WorkerType = UserSever;
