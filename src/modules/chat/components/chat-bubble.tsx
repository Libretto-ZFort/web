import { cn } from '@/src/lib/utils';
import { useAuthSession } from '@/src/modules/auth/providers/auth-session-provider';
import { Message } from '@/src/modules/chat/types';

type ChatBubbleProps = {
  message: Message;
};

export function ChatBubble({ message }: ChatBubbleProps) {
  const { session } = useAuthSession();

  return (
    <div
      className={cn('w-fit py-1 px-3 rounded-full', {
        'bg-gray-500': session?.user.id !== message.user_id,
        'bg-blue-500 ml-auto': session?.user.id === message.user_id,
      })}
    >
      {message.text}
    </div>
  );
}
