import AddTask from "@/components/addTask";
import TaskDialog from "@/components/taskDialog";
import TasksBrief from "@/components/tasksBrief";
import TasksList from "@/components/tasksList";
import { LibraryAddCheckRounded } from "@mui/icons-material";

export default function Home() {
  return (
    <main className="w-full h-screen max-w-screen-tablet px-6 pt-10 mx-auto border-l border-r border-gray-200">
      {/* dialog component for add or edit task */}
      <TaskDialog />

      <h1 className="font-bold text-3xl text-blue-600 mb-6 max-mobile:mb-4">
        <LibraryAddCheckRounded className="mr-2 text-blue-600 !w-8 !h-8" />
        Todo List
      </h1>

      <div className="flex flex-col px-8 max-mobile:px-1 mb-4 gap-y-6 max-mobile:gap-y-4">
        {/* brief info of done and undone tasks count */}
        <TasksBrief />

        {/* list of tasks */}
        <TasksList />
      </div>

      {/* component of "add task" button */}
      <AddTask />
    </main>
  );
}
