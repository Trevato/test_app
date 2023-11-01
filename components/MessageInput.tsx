import React, { useState } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-200 rounded p-2 w-full"
        placeholder="Type your message..."
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white rounded p-2 w-full">
        Send
      </button>
    </form>
  );
};

export default MessageInput;