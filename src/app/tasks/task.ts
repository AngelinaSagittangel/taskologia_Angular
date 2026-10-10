export type TaskPriorityType = 'low' | 'medium' | 'high' | null;

export  type Task = {
  id: number,
  title: string,
  completed: boolean,
  description: string,
  createdAt: string,
  deadline: string | null,
  priority: TaskPriorityType,
}
