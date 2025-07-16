"use client";

import { useState, FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { addTodo } from "@/api";
import { v4 as uuidv4 } from "uuid";

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
        <input
          type="text"
          value={newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
          placeholder="Type here"
          className="input input-bordered w-full mb-4"
        />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </main>
  );
};

export default AddTaskPage; 