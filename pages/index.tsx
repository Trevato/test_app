import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const Home = () => {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    if (supabase) {
      fetchConversations();
      const subscription = supabase
        .from('conversations')
        .on('*', () => fetchConversations())
        .subscribe()
      return () => {
        supabase.removeSubscription(subscription)
      }
    }
  }, [])

  const fetchConversations = async () => {
    if (supabase) {
      const { data, error } = await supabase
        .from('conversations')
        .select('id')
      if (error) console.log('error', error)
      else setConversations(data)
    }
  }

  const handleNewConversation = async () => {
    if (supabase) {
      const { data, error } = await supabase
        .from('conversations')
        .insert([{ id: Math.random().toString(36).substring(7) }])
      if (error) console.log('error', error)
      else setConversations([...conversations, data[0].id])
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Conversations</h1>
      <button onClick={handleNewConversation} className="mb-4 bg-blue-500 text-white rounded p-2 w-full">
        New Conversation
      </button>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <Link href={`/${conversation.id}`}>
              <a className="text-blue-500">Conversation {conversation.id}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;