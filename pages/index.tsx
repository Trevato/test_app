import { useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [conversations, setConversations] = useState<string[]>([]);

  const handleNewConversation = () => {
    const id = Math.random().toString(36).substring(7);
    setConversations([...conversations, id]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Conversations</h1>
      <button onClick={handleNewConversation} className="mb-4 bg-blue-500 text-white rounded p-2 w-full">
        New Conversation
      </button>
      <ul>
        {conversations.map((id) => (
          <li key={id}>
            <Link href={`/${id}`}>
              <a className="text-blue-500">Conversation {id}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;