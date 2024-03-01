import { TaskCard } from '@/src/modules/tasks/components/task-card';
import { TasksDetailsDialog } from '@/src/modules/tasks/components/task-details-dialog';
import { useGetTasks } from '@/src/modules/tasks/hooks/use-get-tasks';
import { TasksProvider } from '@/src/modules/tasks/providers/tasks-provider';

export function TasksList() {
  const { tasks } = useGetTasks();

  return (
    <TasksProvider>
      <TasksDetailsDialog />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </TasksProvider>
  );
}
