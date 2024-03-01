import { useAuthSession } from '@/src/modules/auth/providers/auth-session-provider';
import { Message } from '@/src/modules/chat/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useGetMessages() {
  const { supabase } = useAuthSession();

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      if (!supabase) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) {
          throw error;
        }

        setMessages(data.reverse());
      } catch (e) {
        toast.error('Cannot get messages');
      }
    };

    getMessages();
  }, [supabase]);

  supabase
    ?.channel('Messages')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages' },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setMessages((messages) =>
            messages.find((m) => m.id === payload.new.id)
              ? messages
              : [...messages, payload.new as Message]
          );
        }
      }
    )
    .subscribe();

  const addMessage = (message: Message) => {
    setMessages((messages) => {
      return messages.find((m) => m.id === message.id)
        ? messages
        : [...messages, message];
    });
  };

  return { messages, addMessage };
}
