import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    public router: Router,
  ) {}

  async canActivate(): Promise<boolean> {
    const accessToken = this.authService.accessToken;
    if (this.authService.isAccessTokenValid(accessToken)) {
      return true;
    }
    await this.authService.logout();
    return false;
  }
}
