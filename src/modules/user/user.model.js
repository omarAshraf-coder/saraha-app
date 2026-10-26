import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: String,
  code: String,
  confirmEmail: {
    type: Boolean,
    default: false
  },
  isTwoStepVerificationEnabled: {
    type: Boolean,
    default: false
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  },
  bannedUntil: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);