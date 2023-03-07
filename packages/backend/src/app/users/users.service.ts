import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user';
import { UserCreateDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(userCreateDTO: UserCreateDTO): Promise<User> {
    const { email } = userCreateDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newlyCreatedUser = new this.userModel(userCreateDTO);
    await newlyCreatedUser.save();
    delete newlyCreatedUser.password;
    return newlyCreatedUser;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }
}
