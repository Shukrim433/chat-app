import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// GET api/messages/:id         (id of reciever)
router.get("/:id", protectRoute, getMessages)

// POST api/messages/send/:id         (id of reciever)
router.post("/send/:id", protectRoute, sendMessage);

export default router;
