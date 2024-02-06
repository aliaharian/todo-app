import { Task } from "@/types/todo";
import { create } from "zustand";

type TasksState = {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleDoneTask: (id: number) => void;
  deleteTask: (id: number) => void;
  selectedTask?: Task;
  setSelectedTask: (task?: Task) => void;
  openTaskDialog: boolean;
  setOpenTaskDialog: (open: boolean) => void;
};
export const useTasksStore = create<TasksState>()((set) => ({
  tasks: [
    
  ],
  addTask: (task) =>
    set((state) => ({ ...state, tasks: [task, ...state.tasks] })),
  updateTask: (task) =>
    set((state) => ({
      ...state,
      tasks: state.tasks.map((item) =>
        item.id === task.id ? { ...task } : item
      ),
    })),
  toggleDoneTask: (id) =>
    set((state) => ({
      ...state,
      tasks: state.tasks.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      ...state,
      tasks: state.tasks.filter((item) => item.id !== id),
    })),
  selectedTask: undefined,
  setSelectedTask: (task) => set((state) => ({ ...state, selectedTask: task })),
  openTaskDialog: false,
  setOpenTaskDialog: (open) =>
    set((state) => ({ ...state, openTaskDialog: open })),
}));
