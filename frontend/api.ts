import { ITask } from "./types/tasks";

const baseUrl = "http://localhost:5161/api/todos";

export const getAllTodos = async (): Promise<ITask[]> => {
    const response = await fetch(`${baseUrl}`, {cache: 'no-store'});
    const todos = await response.json();
    return todos;
}

export const addTodo = async (todo: Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>): Promise<ITask> => {
    const response = await fetch(`${baseUrl}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const newTodo = await response.json();
    return newTodo;
}

export const editTodo = async (id: number, todo: Partial<Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ITask> => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const updatedTodo = await response.json();
    return updatedTodo;
}

export const deleteTodo = async (id: number): Promise<void> => {
    await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    });
}