import React from 'react';

interface MessageProps {
  user: string;
  content: string;
}

const Message: React.FC<MessageProps> = ({ user, content }) => {
  return (
    <div className="p-2 border-b border-gray-200">
      <h3 className="font-bold">{user}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Message;