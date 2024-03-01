import { api } from '@/src/lib/axios';
import { TaskStatus } from '@/src/modules/tasks/types';
import { useMutation } from '@tanstack/react-query';

export type CreateTaskOutDto = {
  title: string;
  description?: string;
  status: TaskStatus;
};

const createTaskMutation = (body: CreateTaskOutDto) => {
  return api.post('/tickets', body);
};

export function useCreateTask() {
  const mutation = useMutation({
    mutationFn: createTaskMutation,
  });

  return mutation;
}
