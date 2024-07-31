import { Routes } from '@angular/router';
import { MapComponent } from './pages/map/map.component';
import { AuthComponent } from './pages/auth/auth.component';
import { unauthGuard } from './core/guards/unauth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((c) => c.AuthComponent),
    canActivate: [unauthGuard],
  },
  {
    path: 'map',
    loadComponent: () =>
      import('./pages/map/map.component').then((c) => c.MapComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
