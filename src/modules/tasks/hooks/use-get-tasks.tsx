import { useAuthSession } from '@/src/modules/auth/providers/auth-session-provider';
import { Task } from '@/src/modules/tasks/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useGetTasks() {
  const { supabase } = useAuthSession();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      if (!supabase) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setTasks(data);
      } catch (e) {
        toast.error('Cannot get tasks');
      }
    };

    getTasks();
  }, [supabase]);

  supabase
    ?.channel('Tasks')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'tickets' },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setTasks((tasks) => [payload.new as Task, ...tasks]);
        } else if (payload.eventType === 'UPDATE') {
          setTasks((tasks) => {
            const taskIndex = tasks.findIndex(
              (task) => task.id === payload.old.id
            );

            if (taskIndex === -1) {
              return tasks;
            }

            return tasks.map((task, index) => {
              if (index === taskIndex) {
                return payload.new as Task;
              }

              return task;
            });
          });
        } else if (payload.eventType === 'DELETE') {
          setTasks((tasks) =>
            tasks.filter((task) => task.id !== payload.old.id)
          );
        }
      }
    )
    .subscribe();

  return { tasks };
}
