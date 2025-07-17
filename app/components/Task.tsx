"use client"

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
    const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    
    const handleSubmitEditTodo : FormEventHandler<HTMLFormElement> = async (e) => {
            e.preventDefault();
            await editTodo({id: task.id, text: taskToEdit});
        setTaskToEdit("");
        setModalOpenEdit(false);
        router.refresh();
    };
    
    const handleDeleteTask = async ( id : string)=>{
        await deleteTodo(id);
        setModalOpenDelete(false);
        router.refresh();
    }
    
  return (
    <TableRow key={task.id}>
        <TableCell className="w-full">{task.text}</TableCell>
        <TableCell className="flex gap-5">           <FiEdit onClick={() => setModalOpenEdit(true)} cursor='pointer' size={25} className='text-blue-500'></FiEdit>            
            <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
                <form onSubmit={handleSubmitEditTodo}>
                    <h3 className='text-lg font-bold'>
                       Edit task
                    </h3>
                    <div className='modal-action'>
                        <Input 
                        value={taskToEdit}
                        onChange={(e)=>setTaskToEdit(e.target.value)} 
                        placeholder='Type here' 
                        className='w-full' 
                        />
                        <Button type='submit'>Submit</Button>                   </div>
                </form>
            </Modal>
            <FiTrash2 onClick={() => setModalOpenDelete(true)} cursor='pointer' size={25} className='text-red-500'></FiTrash2>
            <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
                <h3 className='text-lg font-bold'>
                    Are you sure, you want to delete this task?
                </h3>
                <div className='modal-action'>
                    <Button onClick={() => handleDeleteTask(task.id)} variant="destructive">Delete</Button>
                </div>
            </Modal>
        </TableCell>
      </TableRow>
  )
}

export default Task