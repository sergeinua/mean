import { Component } from '@angular/core';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading = false;

  constructor(private authService: AuthService) {}

  async onLoginClick(login: string, password: string): Promise<void> {
    this.isLoading = true;
    await this.authService.login(login, password);
    this.isLoading = false;
  }
}
