"use client";

import { useTasksStore } from "@/store/useTasksStore";
import TaskItem from "./TaskItem";

const TasksList = () => {
  const { tasks, toggleDoneTask } = useTasksStore();

  return (
    <div>
      <h2 className="text-gray-500 text-2xl mb-4">
        {tasks.length ? "Today`s tasks" : "Add your first task!"}
      </h2>
      <div className="flex w-full flex-col gap-y-4" role="list">
        {tasks.map((item) => {
          return (
            <TaskItem
              key={item.id}
              task={item}
              onToggleDone={toggleDoneTask}
            />
          );
        })}
      </div>
    </div>
  );
};
export default TasksList;
