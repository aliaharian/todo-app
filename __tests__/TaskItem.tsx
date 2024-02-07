import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { useTasksStore } from "@/store/useTasksStore";
import TaskItem from "@/components/tasksList/TaskItem";
import { Task } from "@/types/todo";

const task: Task = {
  id: 1,
  isDone: false,
  title: "Task 1",
  updatedAt: Date.now(),
};

const renderComponent = () => {
  render(<TaskItem onToggleDone={jest.fn()} task={task} />);
};
describe("TaskItem component", () => {
  it("renders the title of task", () => {
    renderComponent();

    const taskTitle = screen.getByText("Task 1");
    expect(taskTitle).toBeInTheDocument();
  });

  it("calls deleteTask when click of delete icon button", async () => {
    renderComponent();
    const deleteTask = jest.spyOn(useTasksStore.getState(), "deleteTask");

    const deleteBtn = screen.getByTestId(`deleteBtn`);
    fireEvent.click(deleteBtn);

    waitFor(() => {
      expect(deleteTask).toHaveBeenCalledTimes(1);
      expect(deleteTask).toHaveBeenCalledWith(1);
    });
  });
  it("opens TaskDialog when click of edit icon button", async () => {
    renderComponent();

    const editBtn = screen.getByTestId(`editBtn`);
    fireEvent.click(editBtn);

    waitFor(() => {
      expect(screen.queryByText(/Edit Task/i)).not.toBeInTheDocument();
      expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    });
  });
});
