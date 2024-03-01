import { Badge } from '@/src/common/components/ui/badge';
import { TaskStatus } from '@/src/modules/tasks/types';

type TaskBadgeProps = {
  status: TaskStatus;
};

export function TaskBadge({ status }: TaskBadgeProps) {
  const badgeVariants = {
    Active: 'success' as 'success',
    Inactive: 'destructive' as 'destructive',
  };

  return <Badge variant={badgeVariants[status]}>{status}</Badge>;
}
