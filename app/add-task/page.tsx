"use client";

import { useState, FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { addTodo } from "@/api";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddTaskPage = () => {
  const router = useRouter();
  const [newTaskValue, setNewTaskValue] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({ id: uuidv4(), text: newTaskValue });
    router.push("/");
  };

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
          placeholder="Type here"
          className="mb-4"
        />
        <Button type="submit">
          Save
        </Button>
      </form>
    </main>
  );
};

export default AddTaskPage; 