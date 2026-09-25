import contactService from "../services/contact.service.js";

const sendMessage = async (req, res, next) => {
  try {
    const message = await contactService.saveMessage(req.body);
    res.status(201).json({
      success: true,
      message: "Message bien reçu, merci ! Je vous réponds au plus vite.",
      data: { id: message.id },
    });
  } catch (err) {
    next(err);
  }
};

export default {
  sendMessage,
};
