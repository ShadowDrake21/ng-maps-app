import { Component, inject, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  getUserFromLS,
  retrieveFromLocalStorage,
} from '../../utils/localStorage.utils';
import { AUTH_LS_NAME } from '../../../core/constants/auth.constants';
import { IAuthResponse } from '../../models/auth.model';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/authentication/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { isAuthResponse } from '../../utils/dataCheckings.utils';

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
    this.user = getUserFromLS();

    if (!this.user) {
      this.noUser = 'Guest mode';
    }
  }

  onSignOut() {
    this.authService.signOut();
  }
}
