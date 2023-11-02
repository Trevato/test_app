import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface Message {
  id: string;
  content: string;
  conversation_id: string;
}

const ConversationPage: React.FC = () => {
  const router = useRouter();
  const { conversationId } = router.query;

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (supabase) {
      fetchMessages();
      const subscription = supabase
        .from(`messages:conversation_id=eq.${conversationId}`)
        .on('*', () => fetchMessages())
        .subscribe()
      return () => {
        supabase.removeSubscription(subscription)
      }
    }
  }, [conversationId, supabase])

  const fetchMessages = async () => {
    if (supabase) {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
      if (error) console.log('error', error)
      else setMessages(data as Message[])
    }
  }

  const handleSend = async (content: string) => {
    if (supabase) {
      const { data, error } = await supabase
        .from('messages')
        .insert([{ content, conversation_id: conversationId }])
      if (error) console.log('error', error)
      else setMessages([...messages, data[0] as Message])
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Conversation {conversationId}</h1>
      <div className="border border-gray-200 rounded p-4">
        {messages.map((message) => (
          <Message key={message.id} user="User" content={message.content} />
        ))}
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ConversationPage;