import React, { useEffect, useState } from 'react';

import ChatData from '../models/ChatData';
import ChatMessage from '../models/ChatMessage';

import ky from "ky";

import "./Chat.scss";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [payload, setPayload] = useState("");

  useEffect(() => {
    ky.get("/api/chat")
    .then(response => {
      if(response.status === 200) {
        return response.json() as Promise<ChatData>;
      }
    })
    .then((body: ChatData | undefined) => {
      if(body === undefined) {
        return;
      }

      setMessages(body.messages);
    })
  });

  const sendMessage = () => {
    ky.post("/api/chat", { json: {
        message: payload,
        author: "Guest"
      }
    })
    .then(response => {
      if(response.status === 201) {
        setPayload("");
      }
    })
  };

  return (
    <div className="chat-box">
      <div className="message-list">
        <>
          {
            messages.map((message, nmessage) => {
              return <p key={nmessage}><span className="message-author-name">{message.author}</span>: {message.message}</p>
            })
          }
        </>
      </div>
      <div className="message-input">
        <textarea onChange={e => setPayload(e.target.value)} value={payload} onSubmit={sendMessage}/>
        <br />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
