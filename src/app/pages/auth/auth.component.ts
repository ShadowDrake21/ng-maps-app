import { Component, inject } from '@angular/core';
import { AuthBtnComponent } from './components/auth-btn/auth-btn.component';
import { AuthService } from '../../core/authentication/auth.service';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';
import { tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { saveToLocalStorage } from '../../shared/utils/localStorage.utils';
import { AUTH_LS_NAME } from '../../core/constants/auth.constants';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthBtnComponent, MatProgressSpinnerModule, NgIf],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);

  isAuth: boolean = false;

  onSignIn() {
    this.isAuth = true;
    this.authService
      .authWithGithub()
      .pipe(
        tap((result) => {
          if (result.token && result.user) {
            saveToLocalStorage(AUTH_LS_NAME, result);
            this.router.navigate(['/map']);
            this.openSnackBar('Successfull authorization with GitHub');
          } else {
            this.openSnackBar(
              'An error occurred during the authorization session'
            );
          }

          this.isAuth = false;
        })
      )
      .subscribe();
  }

  openSnackBar(text: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: text,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }
}
