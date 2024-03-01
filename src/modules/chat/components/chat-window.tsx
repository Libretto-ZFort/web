import { Button } from '@/src/common/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/common/components/ui/form';
import { Input } from '@/src/common/components/ui/input';
import { ChatBubble } from '@/src/modules/chat/components/chat-bubble';
import { useGetMessages } from '@/src/modules/chat/hooks/use-get-messages';
import { useSendMessage } from '@/src/modules/chat/hooks/use-send-messsage';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
  message: z.string().min(1, { message: 'Please enter a message' }),
});

type FormSchema = z.infer<typeof formSchema>;

export function ChatWindow() {
  const form = useForm<FormSchema>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { messages, addMessage } = useGetMessages();
  const { sendMessage } = useSendMessage();
  const onSubmit = async (data: FormSchema) => {
    try {
      const message = await sendMessage(data.message);
      addMessage(message);
      form.reset();
    } catch (e) {
      toast.error('Something went wrong, please try again later');
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <>
      <div className="p-4 pb-6 space-y-2">
        {messages?.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-1 fixed py-4 bottom-0 right-8 left-8 bg-background"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} placeholder="Enter a message" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="ghost" size="icon">
            <SendIcon />
          </Button>
        </form>
      </Form>
    </>
  );
}
