import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isConfirmed: { type: Boolean, default: false }
}, { timestamps: true });

export const User = mongoose.models.User || model('User', userSchema);