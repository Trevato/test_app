import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';

interface Conversation {
  id: string;
  messages: { user: string; content: string }[];
}

const ConversationPage: React.FC = () => {
  const router = useRouter();
  const { conversationId } = router.query;

  const [messages, setMessages] = useState<{ user: string; content: string }[]>([]);

  useEffect(() => {
    fetch('/api/conversations')
      .then(response => response.json())
      .then((data: { conversations: Conversation[] }) => {
        const conversation = data.conversations.find((c: Conversation) => c.id === conversationId)
        if (conversation) {
          setMessages(conversation.messages)
        }
      })
  }, [conversationId])

  const handleSend = (message: string) => {
    const newMessages = [...messages, { user: 'User', content: message }]
    setMessages(newMessages);
    fetch('/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: conversationId, messages: newMessages }),
    })
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