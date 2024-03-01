export type TaskStatus = 'Active' | 'Inactive';

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;
};
