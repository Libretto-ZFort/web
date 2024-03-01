import { CreateTask } from '@/src/modules/tasks/components/create-task';
import { TasksList } from '@/src/modules/tasks/components/tasks-list';

export function TasksPage() {
  return (
    <div className="container">
      <div className="flex justify-end mb-4">
        <CreateTask />
      </div>
      <TasksList />
    </div>
  );
}
