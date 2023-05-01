import { Task } from "../api/Task";

interface IReadStorage {
  (): Task[] | [];
}

export const readFromStorage: IReadStorage = () => {
  const items = localStorage.getItem("tasks-djess-v");
  let list: [] = [];

  if (items) {
    list = JSON.parse(items, (key, value) => {
      if (key === "createdAt") return new Date(value);
      return value;
    });
  }

  return list;
};
