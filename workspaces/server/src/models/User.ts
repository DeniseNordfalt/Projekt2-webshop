import { NextFunction } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import { UserItem } from '@project-webbshop/shared'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  roles: { type: [String], required: true, default: ["customer"] },
  deliveryAddress: {
    streetName: { type: String, required: false },
    streetNumber: { type: Number, required: false },
    county: { type: String, required: false },
    postalCode: { type: Number, required: false },
  },
});

userSchema.pre(/save/, async function (next): Promise<void> {
  if (this.modifiedPaths().includes('password')) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next()
})

// userSchema.statics.login = async function (username: string, password: string): Promise<UserItem>{
//   const user = await this.findOne({ username });
//   return user && password && (await bcrypt.compare(password, user.password))
//     ? user
//     : null;
// };

const User = mongoose.model<UserItem>("User", userSchema);

export const handleNewUser = async (user: UserItem): Promise<UserItem> => {
  const newUser = await User.create(user);
  return newUser;
}



export const verifyUser = async (email: string, password: string): Promise<UserItem | null> => {
  const user = await User.findOne({ email }) as unknown as UserItem;
  return user && password && (await bcrypt.compare(password, user.password))
    ? user
    : null;
}