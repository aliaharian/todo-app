import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { useTasksStore } from "@/store/useTasksStore";
import TasksList from "@/components/tasksList";

const renderComponent = () => {
  render(<TasksList />);
};
describe("TasksList component", () => {
  it("renders the heading and task list container", () => {
    renderComponent();

    const heading = screen.getByText(/(Today's tasks|Add your first task!)/i);
    expect(heading).toBeInTheDocument();
    const taskListContainer = screen.getByRole("list");
    expect(taskListContainer).toBeInTheDocument();
  });

  it("renders a TaskItem for each task in the store", async () => {
    renderComponent();
    await act(async () => {
      useTasksStore.getState().addTask({
        id: 1,
        isDone: false,
        title: "Task 1",
        updatedAt: Date.now(),
      });
      useTasksStore.getState().addTask({
        id: 2,
        isDone: false,
        title: "Task 2",
        updatedAt: Date.now(),
      });
    });

    const taskItems = screen.getAllByRole("listitem");
    waitFor(() => {
      expect(taskItems).toHaveLength(2);
      expect(taskItems[0]).toHaveTextContent("Task 1");
      expect(taskItems[1]).toHaveTextContent("Task 2");
    });
  });

  it("calls toggleDoneTask when a task is toggled", async () => {
    renderComponent();
    const toggleDoneTask = jest.spyOn(
      useTasksStore.getState(),
      "toggleDoneTask"
    );

    await act(async () => {
      useTasksStore.getState().addTask({
        id: 1,
        isDone: false,
        title: "Task 1",
        updatedAt: Date.now(),
      });
    });

    const taskItem = screen.getByTestId(`task1`);
    fireEvent.click(taskItem);

    waitFor(() => {
      expect(toggleDoneTask).toHaveBeenCalledTimes(1);
      expect(toggleDoneTask).toHaveBeenCalledWith(1); //id of sample task that i created at l.55
    });
  });
});
