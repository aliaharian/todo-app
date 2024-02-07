import TaskDialog from "@/components/taskDialog";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { useTasksStore } from "@/store/useTasksStore";
import { act } from "react-dom/test-utils";
import { Task } from "@/types/todo";

const task: Task = {
  id: 1,
  isDone: false,
  title: "Task 1",
  updatedAt: Date.now(),
};
const renderComponent = async () => {
  await act(async () => {
    useTasksStore.getState().setOpenTaskDialog(true);
  });
  render(<TaskDialog />);
};
describe("TaskDialog component", () => {
  it("renders initial state with Add button", async () => {
    await renderComponent();
    const dialogTitle = screen.getByText(/Add Task/i);
    const inputField = screen.getByLabelText(/Task Title/i);
    const confirmButton = screen.getByRole("button", { name: /Add/i });
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });

    expect(dialogTitle).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
  it("updates input value on change", async () => {
    await renderComponent();
    const inputField: HTMLInputElement =
      screen.getByPlaceholderText("Task Title");
    expect(inputField).toBeInTheDocument();
    await userEvent.type(inputField, "New Task");
    await waitFor(() => {
      expect(inputField.value).toBe("New Task");
    });
  });
  it("closes dialog when cancel button is clicked", async () => {
    await renderComponent();
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });

    await userEvent.click(cancelButton);
    await waitFor(() => {
      expect(screen.queryByText(/Task Title/i)).not.toBeInTheDocument();
    });
  });
  it("calls addTask function with correct data on confirm", async () => {
    const addTaskFn = jest.spyOn(useTasksStore.getState(), "addTask");
    await renderComponent();
    const inputField: HTMLInputElement =
      screen.getByPlaceholderText("Task Title");
    const confirmButton = screen.getByRole("button", { name: /Add/i });
    await userEvent.type(inputField, "New Task");
    await waitFor(() => {
      expect(inputField.value).toBe("New Task");
    });
    await userEvent.click(confirmButton);
    await waitFor(() => {
      expect(addTaskFn).toHaveBeenCalledWith(
        expect.objectContaining({
          isDone: false,
          title: "New Task",
        })
      );
    });
  });
  it("calls editTask function with correct data on confirm if having selectedTask", async () => {
    await act(async () => {
      useTasksStore.getState().addTask(task);
      useTasksStore.getState().setSelectedTask(task);
    });

    const updateTaskFn = jest.spyOn(useTasksStore.getState(), "updateTask");
    await renderComponent();
    const inputField: HTMLInputElement =
      screen.getByPlaceholderText("Task Title");
    const confirmButton = screen.getByRole("button", { name: /Edit/i });
    await userEvent.type(inputField, "2");
    await waitFor(() => {
      expect(inputField.value).toBe("Task 12");
    });
    await userEvent.click(confirmButton);
    await waitFor(() => {
      expect(updateTaskFn).toHaveBeenCalledWith(
        expect.objectContaining({
          id: task.id,
          isDone: task.isDone,
          title: "Task 12",
        })
      );
    });
  });
  it("shows error message when trying to confirm with empty input", async () => {
    await renderComponent();
    const confirmButton = screen.getByRole("button", { name: /Add/i });

    await userEvent.click(confirmButton);

    const errorText = screen.getByText(/Task title field is required/i);
    waitFor(() => {
      expect(errorText).toBeInTheDocument();
    });
  });
});
