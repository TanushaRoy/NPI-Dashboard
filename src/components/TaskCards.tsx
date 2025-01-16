"use client";
import Image from "next/image";
import avatarImg from "@/assets/dummy-avatar.jpg";
import { EmpDataProps } from "@/types/types";
import { useState, useEffect } from "react";

interface Task {
  //   imageUrl?: string;
  //   name?: string;
  //   bio?: string;
  //   role?: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
}

export default function TaskCards({ imageUrl, name, role }: EmpDataProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    description: "",
    status: "To Do",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem(`${name}-tasks`);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [name]);

  const handleAddTask = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask({ title: "", description: "", status: "To Do" });
      localStorage.setItem(`${name}-tasks`, JSON.stringify(updatedTasks));
    }
  };

  const handleEditTask = (index: number) => {
    const taskToEdit = tasks[index];
    setNewTask(taskToEdit);
    setEditIndex(index);
  };

  const handleUpdateTask = () => {
    if (
      editIndex !== null &&
      newTask.title.trim() &&
      newTask.description.trim()
    ) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setNewTask({ title: "", description: "", status: "To Do" });
      setEditIndex(null);
      localStorage.setItem(`${name}-tasks`, JSON.stringify(updatedTasks));
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem(`${name}-tasks`, JSON.stringify(updatedTasks));
  };

  return (
    <div className="p-6 m-4 bg-white rounded-xl shadow-lg border-2 hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <div className="flex items-center gap-6 mb-4">
        <Image
          src={avatarImg || imageUrl}
          height={60}
          width={60}
          alt="profileImg"
          className="rounded-full border-2 border-gray-300"
        />
        <div>
          <div className="text-xl font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-500">{role}</div>
        </div>
      </div>
      <div className="p-2">
        <input
          type="text"
          placeholder="Task Title"
          className="w-full outline-blue-200 ring-2 ring-gray-200 rounded-lg p-2 mb-2"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          className="w-full outline-blue-200 ring-2 ring-gray-200 rounded-lg p-2 mb-2"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <select
          className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2 cursor-pointer hover:bg-gray-50 transition duration-200"
          value={newTask.status}
          onChange={(e) =>
            setNewTask({ ...newTask, status: e.target.value as Task["status"] })
          }
        >
          <option value="To Do" className="text-gray-700">
            To Do
          </option>
          <option value="In Progress" className="text-blue-700">
            In Progress
          </option>
          <option value="Completed" className="text-green-700">
            Completed
          </option>
        </select>
        <button
          className="italic p-2 bg-black text-white rounded-lg text-xs"
          onClick={editIndex === null ? handleAddTask : handleUpdateTask}
        >
          {editIndex === null ? "Add Task" : "Update Task"}
        </button>
      </div>
      <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="p-2">
        <div className="font-bold text-lg">Tasks List</div>
        <div>
          {tasks.length > 0 ? (
            <ul className="list-disc pl-5">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <li className="text-gray-700">
                    <strong>{task.title}</strong>: {task.description}{" "}
                    <span className="italic text-xs">({task.status})</span>
                  </li>
                  <div>
                    <button
                      className="italic p-2 bg-blue-500 text-white rounded-lg text-xs mr-2"
                      onClick={() => handleEditTask(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="italic p-2 bg-red-500 text-white rounded-lg text-xs"
                      onClick={() => handleDeleteTask(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No tasks added yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
