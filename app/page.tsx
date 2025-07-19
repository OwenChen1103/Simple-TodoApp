"use client";

import { useEffect } from "react";
import { useTodoStore } from "@/stores/todoStore";
import TodoList from "./components/TodoList";
import AddTask from "./components/AddTask";

export default function Home() {
  const { todos, loading, fetchTodos } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTask />
      </div>
      <TodoList tasks={todos} />
    </main>
  );
}
