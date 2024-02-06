"use client"
import { useTasksStore } from "@/store/useTasksStore";
import { Button } from "@mui/material";

const AddTask = () => {
  const { setOpenTaskDialog } = useTasksStore();
  const handleOpenTaskDialog = () => {
    setOpenTaskDialog(true);
  };
  return (
    <div className="sticky bg-white border-t border-gray-200 bottom-0 w-full max-w-tablet h-16 flex items-center justify-center">
      <Button
        onClick={handleOpenTaskDialog}
        className="h-12 w-48 !bg-blue-400 !text-white !rounded-full"
      >
        ADD TASK
      </Button>
    </div>
  );
};
export default AddTask;
