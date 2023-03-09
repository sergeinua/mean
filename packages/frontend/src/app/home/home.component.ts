import { Component, OnInit } from '@angular/core';

import { HomeSevice } from './home.sevice';
import { User } from './user';

@Component({
  selector: 'app-home',
  template: '<div>home page works!</div>',
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private homeService: HomeSevice) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.homeService.fetchUsers();
  }
}
