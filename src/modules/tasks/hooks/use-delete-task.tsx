import { api } from '@/src/lib/axios';
import { useMutation } from '@tanstack/react-query';

const deleteTaskMutation = (id: number) => {
  return api.delete(`/tickets/${id}`);
};

export function useDeleteTask() {
  const mutation = useMutation({
    mutationFn: deleteTaskMutation,
  });

  return mutation;
}
