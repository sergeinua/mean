import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const config = new ConfigService();

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required:true,
  },
});

UserSchema.pre('save', async function(next: mongoose.CallbackWithoutResultAndOptionalError) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await config.get<string>('MONGODB_URI')
    const hashed = await bcrypt.hash(this['password'], salt);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
