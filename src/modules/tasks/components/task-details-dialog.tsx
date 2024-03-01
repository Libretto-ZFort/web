import { Button } from '@/src/common/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/src/common/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/common/components/ui/select';
import { useDeleteTask } from '@/src/modules/tasks/hooks/use-delete-task';
import { useEditableElement } from '@/src/modules/tasks/hooks/use-editable-element';
import { useUpdateTask } from '@/src/modules/tasks/hooks/use-update-task';
import { useTasks } from '@/src/modules/tasks/providers/tasks-provider';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function TasksDetailsDialog() {
  const { selectedTask, selectTask } = useTasks();

  const { mutateAsync: updateTask } = useUpdateTask();
  const updateFieldCallback =
    (field: 'title' | 'description' | 'status') => async (value: string) => {
      try {
        await updateTask({
          id: selectedTask?.id ?? 0,
          body: {
            ...selectedTask,
            [field]: value,
          },
        });

        selectTask({
          ...selectedTask!,
          [field]: value,
        });
      } catch (e) {
        toast.error('Something went wrong, please try again later');
      }
    };

  const [title, titleEditable, setTitleEditable, handleTitleEdit] =
    useEditableElement(updateFieldCallback('title'), selectedTask?.title);
  const [
    description,
    descriptionEditable,
    setDescriptionEditable,
    handleDescriptionEdit,
  ] = useEditableElement(
    updateFieldCallback('description'),
    selectedTask?.description
  );

  const [status, setStatus] = useState('Active');
  useEffect(() => {
    if (!selectedTask) {
      return;
    }

    setStatus(selectedTask.status);
  }, [selectedTask]);
  const handleStatusChange = async (status: string) => {
    try {
      await updateFieldCallback('status')(status);
      setStatus(status);
    } catch (e) {
      toast.error('Something went wrong, please try again later');
    }
  };

  const { mutateAsync: deleteTask } = useDeleteTask();
  const handleDeleteTask = async () => {
    if (!selectedTask) {
      return;
    }

    try {
      await deleteTask(selectedTask.id);
      selectTask(null);
    } catch (e) {
      toast.error('Something went wrong, please try again later');
    }
  };

  return (
    <Dialog open={selectedTask !== null} onOpenChange={() => selectTask(null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle
            className="text-2xl cursor-pointer"
            onDoubleClick={() => setTitleEditable(true)}
            contentEditable={titleEditable}
            onBlur={handleTitleEdit}
          >
            {title}
          </DialogTitle>
          <DialogDescription className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <span className="font-bold text-base">Description:</span> <br />
              <p
                onDoubleClick={() => setDescriptionEditable(true)}
                contentEditable={descriptionEditable}
                onBlur={handleDescriptionEdit}
              >
                {description}
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-base mb-2">Status:</p>
                <Select onValueChange={handleStatusChange} value={status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="font-bold text-base mb-2">Date created:</p>
                {DateTime.fromISO(
                  selectedTask?.created_at || new Date().toISOString()
                ).toFormat('dd LLL yyyy, HH:mm')}
              </div>
              <div>
                <Button variant="destructive" onClick={handleDeleteTask}>
                  Delete
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
