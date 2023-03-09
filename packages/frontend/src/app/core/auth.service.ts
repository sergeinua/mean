import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { firstValueFrom, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3333/api/auth';
  private readonly storageKey = 'ACCESS_TOKEN';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  get accessToken(): string {
    return sessionStorage.getItem(this.storageKey) || '';
  }

  set accessToken(accessToken: string) {
    sessionStorage.setItem(this.storageKey, accessToken);
  }

  async login(username: string, password: string): Promise<void> {
    await firstValueFrom(
      this.http.post<{ accessToken: string }>(`${this.apiUrl}/login`, {username, password}).pipe(
        shareReplay(),
        map(async ({accessToken}) => {
          const isAccessTokenValid = this.isAccessTokenValid(accessToken);
          if (isAccessTokenValid) {
            this.accessToken = accessToken;
            await this.router.navigate(['/home']);
          }
          return isAccessTokenValid;
        })),
    );
  }

  async logout(): Promise<void> {
    this.accessToken = '';
    await this.router.navigate(['/auth/login']);
  }

  isAccessTokenValid(accessToken: string): boolean {
    const decoded: any = jwt_decode(accessToken);
    if (!decoded?.exp) { return false; }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date?.valueOf() > new Date().valueOf();
  }
}
