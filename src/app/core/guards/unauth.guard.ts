import { CanActivateFn, Router } from '@angular/router';
import { retrieveFromLocalStorage } from '../../shared/utils/localStorage.utils';
import { IAuthResponse } from '../../shared/models/auth.model';
import { inject } from '@angular/core';

export const unauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = retrieveFromLocalStorage('auth') as IAuthResponse;

  if (auth) {
    router.navigate(['/map']);
    return false;
  }
  return true;
};
