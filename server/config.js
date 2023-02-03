const config = {
  port: 5656,

  isChatEnabled: process.env.IS_CHAT_ENABLED === "true",
  maxChatMessages: Number(process.env.MAX_CHAT_MESSAGES) || 12
}

exports.data = config;
