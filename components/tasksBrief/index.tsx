"use client";

import { useTasksStore } from "@/store/useTasksStore";
import BriefCard from "./BriefCard";

const TasksBrief = () => {
  const { tasks } = useTasksStore();
  return (
    <div className="flex items-center justify-between gap-x-6">
      <BriefCard
        label="Tasks Completed"
        value={tasks.filter((task) => task.isDone).length}
      />
      <BriefCard
        label="Tasks Uncompleted"
        value={tasks.filter((task) => !task.isDone).length}
      />
    </div>
  );
};

export default TasksBrief;
