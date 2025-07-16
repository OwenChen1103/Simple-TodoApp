"use client"

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

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
    <tr key={task.id}>
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5">
            <FiEdit onClick={() => setModalOpenEdit(true)} cursor='pointer' size={25} className='text-blue-500'></FiEdit>            
            <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
                <form onSubmit={handleSubmitEditTodo}>
                    <h3 className='text-lg font-bold'>
                       Edit task
                    </h3>
                    <div className='modal-action'>
                        <input 
                        value={taskToEdit}
                        onChange={(e)=>setTaskToEdit(e.target.value)} 
                        placeholder='Type here' 
                        className='input input-bordered w-full' 
                        />
                        <button type='submit' className='btn'>Submit</button>
                    </div>
                </form>
            </Modal>
            <FiTrash2 onClick={() => setModalOpenDelete(true)} cursor='pointer' size={25} className='text-red-500'></FiTrash2>
            <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
                <h3 className='text-lg font-bold'>
                    Are you sure, you want to delete this task?
                </h3>
                <div className='modal-action'>
                    <button onClick={() => handleDeleteTask(task.id)} className='btn btn-error'>Delete</button>
                </div>
            </Modal>
        </td>
      </tr>
  )
}

export default Task