"use client";
import { useTasksStore } from "@/store/useTasksStore";
import { Task } from "@/types/todo";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";

// type Props = {
//   handleClose: () => void;
//   open: boolean;
//   task?: Task;
// };
const TaskDialog = () => {
  const {
    selectedTask,
    setSelectedTask,
    openTaskDialog,
    setOpenTaskDialog,
    addTask,
    updateTask,
  } = useTasksStore();
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const isMobile = useMediaQuery("(max-width:480px)");
  const handleClose = () => {
    setOpenTaskDialog(false);
    setSelectedTask(undefined);
    setInput("");
    setError("")
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    error && setError("");
    setInput(e.target.value);
  };
  useEffect(() => {
    if (selectedTask) {
      setInput(selectedTask.title);
    }
  }, [selectedTask]);
  const handleClickConfirm = () => {
    if (input) {
      const taskObj: Task = selectedTask
        ? {
            ...selectedTask,
            title: input,
          }
        : {
            id: Date.now(),
            updatedAt: Date.now(),
            isDone: false,
            title: input,
          };
      selectedTask ? updateTask(taskObj) : addTask(taskObj);
      handleClose();
    }else{
      setError("Task title field is required")
    }
  };

  return (
    <Dialog
      maxWidth={"xs"}
      fullScreen={isMobile}
      fullWidth
      onClose={handleClose}
      open={openTaskDialog}
    >
      <DialogTitle className="!pb-2 text-center">
        {selectedTask ? "Edit" : "Add"} Task
      </DialogTitle>
      <DialogContent>
        <div className="!pt-4 w-full flex items-center justify-center">
          <TextField
            value={input}
            autoFocus
            onChange={handleChangeInput}
            label="Task Title"
            className="w-full"
            variant="outlined"
            error={!!error}
            helperText={error}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div className="py-4 w-full flex items-center justify-center gap-x-4">
          <Button
            className="!bg-blue-400 !rounded-full !text-white !px-10"
            onClick={handleClickConfirm}
          >
            {selectedTask ? "Edit" : "Add"}
          </Button>

          <Button
            className="!text-gray-400 !rounded-full"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};
export default TaskDialog;
