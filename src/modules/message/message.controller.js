import { Message } from './message.model.js';
import { User } from '../user/user.model.js';

export const sendAnonymousMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    const message = new Message({ content, receiverId });
    await message.save();

    return res.status(201).json({ message: "Success", messageObj: message });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};

export const requestSenderIdentity = async (req, res) => {
  try {
    const { messageId } = req.body;
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.identityRequested = true;
    message.requestStatus = 'pending';
    await message.save();

    return res.status(200).json({ message: "Identity request sent successfully (Pending)" });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};