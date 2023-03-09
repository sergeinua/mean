import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class HomeSevice {
  private readonly apiUrl = 'http://localhost:3333/api';

  constructor(private http: HttpClient) {}

  async fetchUsers(): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(`${this.apiUrl}/users`));
  }
}
