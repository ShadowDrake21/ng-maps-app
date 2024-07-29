import { Component, inject } from '@angular/core';
import { AuthBtnComponent } from './components/auth-btn/auth-btn.component';
import { AuthService } from '../../core/authentication/auth.service';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthBtnComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);

  onSignIn() {
    this.authService.authWithGithub().subscribe((result) => {
      console.log(result);
      if (result instanceof FirebaseError) {
        console.log('firebase error', result);
        this.openSnackBar(result.message);
      } else {
        console.log('success', result);
        this.router.navigate(['/map']);
        this.openSnackBar('Successfull authorization with GitHub');
      }
    });
  }

  openSnackBar(text: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: text,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }
}
