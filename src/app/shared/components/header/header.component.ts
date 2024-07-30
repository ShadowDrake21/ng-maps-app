import { Component, inject, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatToolbarModule } from '@angular/material/toolbar';
import { retrieveFromLocalStorage } from '../../utils/localStorage.utils';
import { AUTH_LS_NAME } from '../../../core/constants/auth.constants';
import { IAuthResponse } from '../../models/auth.model';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/authentication/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);

  user!: User | null;
  noUser: string = '';

  ngOnInit(): void {
    const data = retrieveFromLocalStorage(AUTH_LS_NAME);

    if (this.isAuthResponse(data) && data.user) {
      this.user = data.user;
    } else {
      this.noUser = 'Guest mode';
    }
  }

  isAuthResponse(data: any): data is IAuthResponse {
    return (
      data &&
      typeof data === 'object' &&
      'token' in data &&
      'user' in data &&
      'uid' in data.user
    );
  }

  onSignOut() {
    this.authService.signOut();
  }
}
