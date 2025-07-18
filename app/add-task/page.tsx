"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { addTodo } from "@/api";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TaskForm = {
  taskText: string;
};

const AddTaskPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskForm>();

  const onSubmit = async (data: TaskForm) => {
    await addTodo({ id: uuidv4(), text: data.taskText });
    reset();
    router.push("/");
  };

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Type here"
          {...register("taskText", { required: "Task cannot be empty" })}
          className="mb-2"
        />
        {errors.taskText && (
          <div className="text-red-500 text-sm mb-2">{errors.taskText.message}</div>
        )}
        <Button type="submit">Save</Button>
      </form>
    </main>
  );
};

export default AddTaskPage; 