import { Button } from '@/src/common/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/common/components/ui/dialog';
import { PlusCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/common/components/ui/form';
import { Input } from '@/src/common/components/ui/input';
import { Textarea } from '@/src/common/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/common/components/ui/select';
import { useCreateTask } from '@/src/modules/tasks/hooks/use-create-task';
import toast from 'react-hot-toast';
import { useRef } from 'react';

const formSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional(),
  status: z.enum(['Active', 'Inactive']),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateTask() {
  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      status: 'Active',
    },
    resolver: zodResolver(formSchema),
  });

  const dialogTriggerRef = useRef<HTMLButtonElement>(null);

  const { mutateAsync } = useCreateTask();

  const onSubmit = async (data: FormValues) => {
    try {
      await mutateAsync(data);
      form.reset();
      dialogTriggerRef.current?.click();
    } catch (e) {
      toast.error('Something went wrong, please try again later');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" ref={dialogTriggerRef}>
          <PlusCircleIcon className="w-4 h-4 mr-4" /> Create task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Create task</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" variant="secondary">
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
