import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  Auth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  throwError,
  timeout,
} from 'rxjs';
import { IAuthResponse } from '../../shared/models/auth.model';
import { removeFromLocalStorage } from '../../shared/utils/localStorage.utils';
import { AUTH_LS_NAME } from '../constants/auth.constants';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  public authWithGithub(): Observable<IAuthResponse> {
    return from(signInWithPopup(this.auth, new GithubAuthProvider())).pipe(
      map((userCredential) => {
        const credential =
          GithubAuthProvider.credentialFromResult(userCredential);
        const token = credential?.accessToken ?? 'none';
        const user = userCredential.user;

        return { user, token };
      }),
      catchError((err: FirebaseError) => {
        return of({ user: null, token: null });
      })
    );
  }

  public signOut() {
    signOut(this.auth);
    removeFromLocalStorage(AUTH_LS_NAME);
    this.router.navigate(['/']);
  }
}
