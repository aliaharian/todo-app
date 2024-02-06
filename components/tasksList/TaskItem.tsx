import { useTasksStore } from "@/store/useTasksStore";
import { Task } from "@/types/todo";
import {
  Check,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";

type Props = {
  task: Task;
  onToggleDone: (id: number) => void;
};
const TaskItem = ({ task, onToggleDone }: Props) => {
  const handleClickCheckbox = () => {
    onToggleDone(task.id);
  };
  const { setSelectedTask, setOpenTaskDialog, deleteTask } = useTasksStore();

  const handleEdit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); //for preventing tasks to be clicked an toggle isDone
    setSelectedTask(task);
    setOpenTaskDialog(true);
  };
  const handleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); //for preventing tasks to be clicked an toggle isDone
    deleteTask(task.id);
  };
  return (
    <div
      role="listitem"
      data-testid={`task${task.id}`}
      onClick={handleClickCheckbox}
      className="cursor-pointer group overflow-hidden w-full bg-gray-100 rounded-full h-16 flex items-center justify-between"
    >
      <div className="flex gap-x-4 items-center p-4">
        <Button
          className={`!w-8 !max-w-8 !min-w-8 h-8 !rounded-full ${
            task.isDone ? "!bg-gray-400" : "!bg-white"
          } !text-gray-500`}
        >
          {task.isDone && <Check className="text-white" />}
        </Button>
        <p className={`text-gray-600 ${task.isDone ? "line-through" : ""}`}>
          {task.title}
        </p>
      </div>
      <div className="translate-x-28 h-full group-hover:translate-x-0 group-hover:opacity-100 transition-all flex">
        <div
          onClick={handleEdit}
          data-testid="editBtn"
          className="group/action cursor-pointer  px-4 bg-yellow-500 flex items-center text-white"
        >
          <EditOutlined className="group-hover/action:scale-110 transition-all" />
        </div>
        <div
          onClick={handleDelete}
          data-testid="deleteBtn"
          className="group/action cursor-pointer px-4 bg-rose-700 flex items-center text-white"
        >
          <DeleteOutlineOutlined className="group-hover/action:scale-110 transition-all" />
        </div>
      </div>
    </div>
  );
};
export default TaskItem;
