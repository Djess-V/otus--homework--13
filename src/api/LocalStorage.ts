import { Task } from "./Task";
import { readFromStorage } from "../storage/readFromStorage";
import { saveInStorage } from "../storage/saveInStorage";
import { filterData } from "./constants";

interface ICreateTask {
  (task: Task): Promise<Task[]>;
}

interface IFetchAll {
  (): Promise<Task[]>;
}

interface ISearch {
  (text: string): Promise<Task[]>;
}

interface IDelete {
  (id: string): Promise<Task[]>;
}

interface IUpdate {
  (id: string, text?: string, status?: boolean): Promise<Task[]>;
}

interface ISortBy {
  (parametr1: string, parametr2: string): Promise<Task[]>;
}

interface ICreateStorage {
  (): Promise<Task[]>;
}

export class LocalStorage {
  static createStorage: ICreateStorage = () => {
    return new Promise((res, rej) => {
      const tasks = readFromStorage();

      if (tasks.length === 0) {
        tasks.push(new Task("Создать задачу", "задача") as never);

        saveInStorage(tasks);
      }

      res(tasks);
    });
  };

  static fetchAll: IFetchAll = () => {
    return new Promise((res, rej) => {
      const tasks = readFromStorage();
      res(tasks);
    });
  };

  static search: ISearch = (text) => {
    return new Promise((res, rej) => {
      let tasks = readFromStorage();

      tasks = tasks.filter((task) => task.text.toLowerCase().includes(text));

      res(tasks);
    });
  };

  static createTask: ICreateTask = (task) => {
    return new Promise((res, rej) => {
      const tasks = readFromStorage();

      tasks.push(task as never);

      saveInStorage(tasks);

      res(tasks);
    });
  };

  static delete: IDelete = (id) => {
    return new Promise((res, rej) => {
      let tasks = readFromStorage();

      tasks = tasks.filter((task) => task.id !== id);

      saveInStorage(tasks);

      res(tasks);
    });
  };

  static update: IUpdate = (id, text, status) => {
    return new Promise((res, rej) => {
      let tasks = readFromStorage();

      tasks = tasks.map((task) => {
        if (task.id === id) {
          if (text) {
            task.text = text.replace(/[<>]/gi, "");
          }

          if (status || status === false) {
            task.status = status;
          }
        }

        return task;
      });

      saveInStorage(tasks);

      res(tasks);
    });
  };

  static sortBy: ISortBy = (param1, param2) => {
    return new Promise((res, rej) => {
      let tasks = readFromStorage();

      switch (param1) {
        // Сортировка по алфавиту.
        case filterData[0].id: {
          switch (param2) {
            // по возрастанию.
            case `${filterData[0].id}1`:
              tasks = tasks.sort((a, b) => {
                if (a.text > b.text) {
                  return 1;
                }
                if (a.text < b.text) {
                  return -1;
                }
                return 0;
              });
              break;

            // по убыванию.
            case `${filterData[0].id}2`:
              tasks = tasks.sort((a, b) => {
                if (a.text < b.text) {
                  return 1;
                }
                if (a.text > b.text) {
                  return -1;
                }
                return 0;
              });
              break;

            default:
              break;
          }
          break;
        }

        // Сортировка по дате.
        case filterData[1].id: {
          switch (param2) {
            // сначала новые записи.
            case `${filterData[1].id}1`:
              tasks = tasks.sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
              );
              break;

            // сначала старрые записи.
            case `${filterData[1].id}2`:
              tasks = tasks.sort(
                (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
              );
              break;

            default:
              break;
          }
          break;
        }

        // Сортировка по статусу.
        case filterData[2].id: {
          switch (param2) {
            // выполненные.
            case `${filterData[2].id}1`:
              tasks = tasks.sort((a, b) => {
                if (!a.status && b.status) {
                  return 1;
                }
                if (a.status && !b.status) {
                  return -1;
                }
                return 0;
              });
              break;

            // невыполненные.
            case `${filterData[2].id}2`:
              tasks = tasks.sort((a, b) => {
                if (a.status && !b.status) {
                  return 1;
                }
                if (!a.status && b.status) {
                  return -1;
                }
                return 0;
              });
              break;

            default:
              break;
          }
          break;
        }

        // Сортировка по тегам.
        case filterData[3].id: {
          const tags = param2
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag !== "");

          tasks = tasks.sort((a, b) => {
            const counTagsA = a.tags.reduce(
              (acc, cur) => (tags.includes(cur) ? 1 : 0) + acc,
              0
            );
            const counTagsB = b.tags.reduce(
              (acc, cur) => (tags.includes(cur) ? 1 : 0) + acc,
              0
            );

            if (counTagsA < counTagsB) {
              return 1;
            }
            if (counTagsA > counTagsB) {
              return -1;
            }
            return 0;
          });
          break;
        }

        default:
          break;
      }

      res(tasks);
    });
  };
}
