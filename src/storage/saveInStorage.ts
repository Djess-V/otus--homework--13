import { Task } from "../api/Task";

export const saveInStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks-djess-v", JSON.stringify(tasks));
};
