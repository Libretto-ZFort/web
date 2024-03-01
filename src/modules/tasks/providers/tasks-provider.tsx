import { Task } from '@/src/modules/tasks/types';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type TasksContext = {
  selectedTask: Task | null;
  selectTask: (task: Task | null) => void;
};

const tasksContext = createContext<TasksContext>({
  selectedTask: null,
  selectTask: () => ({}),
});

export function TasksProvider({ children }: PropsWithChildren) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <tasksContext.Provider
      value={{ selectedTask, selectTask: setSelectedTask }}
    >
      {children}
    </tasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(tasksContext);
}
