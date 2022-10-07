import { NextFunction } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import {UserItem} from '@project-webbshop/shared'

const userSchema = new mongoose.Schema({
  namme: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  role: { type: String, required: true, default: "customer" },
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

const User = mongoose.model<UserItem>("User", userSchema);