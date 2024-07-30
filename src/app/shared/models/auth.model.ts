import { User } from '@angular/fire/auth';

export interface IAuthResponse {
  user: User | null;
  token: string | null;
}
