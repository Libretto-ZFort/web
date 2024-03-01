import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/common/components/ui/card';
import { TaskBadge } from '@/src/modules/tasks/components/task-badge';
import { useTasks } from '@/src/modules/tasks/providers/tasks-provider';
import { Task } from '@/src/modules/tasks/types';

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const { selectTask } = useTasks();

  return (
    <Card className="cursor-pointer" onClick={() => selectTask(task)}>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskBadge status={task.status} />
      </CardContent>
    </Card>
  );
}
