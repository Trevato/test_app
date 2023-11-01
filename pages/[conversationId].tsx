import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';

const ConversationPage: React.FC = () => {
  const router = useRouter();
  const { conversationId } = router.query;

  const [messages, setMessages] = useState<{ user: string; content: string }[]>([]);

  const handleSend = (message: string) => {
    setMessages([...messages, { user: 'User', content: message }]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Conversation {conversationId}</h1>
      <div className="border border-gray-200 rounded p-4">
        {messages.map((message, index) => (
          <Message key={index} user={message.user} content={message.content} />
        ))}
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ConversationPage;