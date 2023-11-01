import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Conversation {
  id: string;
  messages: { user: string; content: string }[];
}

const Home = () => {
  const [conversations, setConversations] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/conversations')
      .then(response => response.json())
      .then((data: { conversations: Conversation[] }) => setConversations(data.conversations.map(c => c.id)))
  }, [])

  const handleNewConversation = () => {
    const id = Math.random().toString(36).substring(7);
    setConversations([...conversations, id]);
    fetch('/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, messages: [] }),
    })
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