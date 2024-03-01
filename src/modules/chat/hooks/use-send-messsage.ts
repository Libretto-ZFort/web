import { useAuthSession } from '@/src/modules/auth/providers/auth-session-provider';

export function useSendMessage() {
  const { supabase } = useAuthSession();

  const sendMessage = async (message: string) => {
    if (!supabase) {
      return;
    }

    const { data, error } = await supabase
      .from('messages')
      .insert({ text: message })
      .select();

    if (error) {
      throw error;
    }

    return data[0];
  };

  return { sendMessage };
}
