import { api } from '@/src/lib/axios';
import { TaskStatus } from '@/src/modules/tasks/types';
import { useMutation } from '@tanstack/react-query';

export type UpdateTaskOutDto = {
  id: number;
  body: Partial<{
    title: string;
    body: string;
    status: TaskStatus;
  }>;
};

const updateTaskMutation = ({ id, body }: UpdateTaskOutDto) => {
  return api.put(`/tickets/${id}`, body);
};

export function useUpdateTask() {
  const mutation = useMutation({
    mutationFn: updateTaskMutation,
  });

  return mutation;
}
