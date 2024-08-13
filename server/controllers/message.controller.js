import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id; // got from middleware (aka logged in user)

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id); // add to the default empty 'messages' array on the conversation model schema
    }

    // await conversation.save();
    // await newMessage.save();

    // The above 2 lines can be replaced by the following line (runs the 2 lines in parallel = quicker)
    await Promise.all([conversation.save(), newMessage.save()]);

    //SOCKET IO FUNCTIONALITY WILL GO HERE
    const recieverSocketId = getRecieverSocketId(recieverId);
    if (recieverSocketId) {
      // io.to(<socket_id>).emit() - method to only send an event to one specific client:
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

// function to get all the messages in a convo between logged in user and a specific user
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res
        .status(200) // 200 status code because we are not sending an error because it is not an error if there is no conversation  (ie no messages)  between the 2 users yet
        .json([]); // return an empty array if there is no conversation
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessages controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
