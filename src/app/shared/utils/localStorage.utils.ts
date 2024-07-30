import { User } from '@angular/fire/auth';
import { AUTH_LS_NAME } from '../../core/constants/auth.constants';
import { isAuthResponse } from './dataCheckings.utils';

export const saveToLocalStorage = (name: string, data: any): void => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const retrieveFromLocalStorage = (name: string): unknown => {
  const strItemFromLS = localStorage.getItem(name);

  if (strItemFromLS) {
    return JSON.parse(strItemFromLS);
  } else {
    return null;
  }
};

export const removeFromLocalStorage = (name: string): void => {
  localStorage.removeItem(name);
};

export const getUserFromLS = (): User | null => {
  const data = retrieveFromLocalStorage(AUTH_LS_NAME);

  if (isAuthResponse(data) && data.user) {
    return data.user;
  } else {
    return null;
  }
};
