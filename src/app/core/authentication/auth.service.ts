import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Auth, GithubAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { catchError, from, map, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  public authWithGithub() {
    return from(signInWithPopup(this.auth, new GithubAuthProvider())).pipe(
      map((userCredential) => {
        const credential =
          GithubAuthProvider.credentialFromResult(userCredential);
        const token = credential?.accessToken;
        const user = userCredential.user;

        return { user, token };
      }),
      catchError((err: FirebaseError) => throwError(() => err))
    );
  }
}
