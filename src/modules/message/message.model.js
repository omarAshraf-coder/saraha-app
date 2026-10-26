import mongoose, { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  messageContent: { type: String, required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Message = mongoose.models.Message || model('Message', messageSchema);