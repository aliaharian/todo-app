import { Task } from "@/types/todo";
import { create } from "zustand";

export type TasksState = {
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
  tasks: [],

  //adding a task to the begining of tasks array
  addTask: (task) =>
    set((state) => ({ ...state, tasks: [task, ...state.tasks] })),

  // finding task by id and update whole of it
  updateTask: (task) =>
    set((state) => ({
      ...state,
      tasks: state.tasks.map((item) =>
        item.id === task.id ? { ...task } : item
      ),
    })),

  // finding a task by id and toggling the "isDone" property and updating its updatedAt timestamp
  toggleDoneTask: (id) =>
    set((state) => ({
      ...state,
      tasks: state.tasks.map((item) =>
        item.id === id
          ? { ...item, isDone: !item.isDone, updatedAt: Date.now() }
          : item
      ),
    })),

  // finding task by id and removeing it from array
  deleteTask: (id) =>
    set((state) => ({
      ...state,
      tasks: state.tasks.filter((item) => item.id !== id),
    })),

  selectedTask: undefined,
  // setting selected task to use it in taskDialog
  setSelectedTask: (task) => set((state) => ({ ...state, selectedTask: task })),

  openTaskDialog: false,
  // open/close taskDialog
  setOpenTaskDialog: (open) =>
    set((state) => ({ ...state, openTaskDialog: open })),
}));
