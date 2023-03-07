import { Controller, Get, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
