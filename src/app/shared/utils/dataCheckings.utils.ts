import { IAuthResponse } from '../models/auth.model';

export const isAuthResponse = (data: any): data is IAuthResponse => {
  return (
    data &&
    typeof data === 'object' &&
    'token' in data &&
    'user' in data &&
    'uid' in data.user
  );
};
