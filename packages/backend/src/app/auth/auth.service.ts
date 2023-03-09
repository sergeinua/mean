import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) { return null; }
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (isPasswordValid) {
      const { password, ...userData } = user;
      return userData;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return { accessToken: this.jwtService.sign(payload, { expiresIn: '60s' }) };
  }
}
