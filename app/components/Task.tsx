"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useTodoStore } from "@/stores/todoStore";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [descriptionToEdit, setDescriptionToEdit] = useState<string>(task.description || "");
  
  const { updateTodo, deleteTodo } = useTodoStore();

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await updateTodo(task.id, { text: taskToEdit, description: descriptionToEdit });
    setTaskToEdit("");
    setDescriptionToEdit("");
    setModalOpenEdit(false);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setModalOpenDelete(false);
  };

  return (
    <TableRow key={task.id}>
      <TableCell className="w-full">
        <div className="font-medium">{task.text}</div>
        {task.description && (
          <div className="text-sm text-muted-foreground mt-1">{task.description}</div>
        )}
      </TableCell>
      <TableCell className="flex gap-5">
        <FiEdit onClick={() => setModalOpenEdit(true)} cursor="pointer" size={25} className="text-blue-500" />
        <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="text-lg font-bold">Edit task</h3>
            <div className="flex flex-col gap-4 mt-4">
              <Input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                placeholder="Task title"
                className="w-full"
              />
              <Textarea
                value={descriptionToEdit}
                onChange={(e) => setDescriptionToEdit(e.target.value)}
                placeholder="Description"
                className="w-full"
                rows={3}
              />
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Modal>
        <FiTrash2 onClick={() => setModalOpenDelete(true)} cursor="pointer" size={25} className="text-red-500" />
        <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
          <h3 className="text-lg font-bold">Are you sure, you want to delete this task?</h3>
          <div className="flex justify-end mt-4">
            <Button onClick={() => handleDeleteTask(task.id)} variant="destructive">
              Delete
            </Button>
          </div>
        </Modal>
      </TableCell>
    </TableRow>
  );
};

export default Task;