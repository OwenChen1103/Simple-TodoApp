"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTodoStore } from "@/app/stores/todoStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const taskSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
});

type TaskForm = z.infer<typeof taskSchema>;

const AddTaskPage = () => {
  const router = useRouter();
  const { addTodo } = useTodoStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskForm) => {
    await addTodo({
      title: data.title,
      description: data.description,
    });
    reset();
    router.push("/");
  };

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Task title"
          {...register("title")}
          className="mb-2"
        />
        {errors.title && (
          <div className="text-red-500 text-sm mb-2">{errors.title.message}</div>
        )}
        <Textarea
          placeholder="Description"
          {...register("description")}
          className="mb-2"
        />
        {errors.description && (
          <div className="text-red-500 text-sm mb-2">{errors.description.message}</div>
        )}
        <Button type="submit">Save</Button>
      </form>
    </main>
  );
};

export default AddTaskPage; 