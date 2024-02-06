import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useTasksStore } from "@/store/useTasksStore";
import AddTask from "@/components/addTask";

const renderComponent = () => {
  render(<AddTask />);
};
describe("AddTask component", () => {
  it("renders the Add Task button", () => {
    renderComponent();
    const button = screen.getByText("ADD TASK");
    expect(button).toBeInTheDocument();
  });
  it("calls setOpenTaskDialog when the button is clicked", () => {
    const openTaskDialogFn = jest.spyOn(
      useTasksStore.getState(),
      "setOpenTaskDialog"
    );
    renderComponent();
    const button = screen.getByText("ADD TASK");
    fireEvent.click(button);

    expect(openTaskDialogFn).toHaveBeenCalledTimes(1);
    expect(openTaskDialogFn).toHaveBeenCalledWith(true);
  });
});
