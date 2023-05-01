import { Task } from "../api/Task";
import { LocalStorage } from "../api/LocalStorage";
import { showModalUpdateTask } from "./showModalUpdateTask";

export function drawTasks(element: HTMLElement, tasks: Task[]) {
  const listTasks = element.querySelector(".app__tasks") as HTMLElement;

  listTasks.innerHTML = `${tasks
    .map((task, i, array) => {
      let entry = "";

      const dateString = `${addZero(task.createdAt.getDate())}.${addZero(
        task.createdAt.getMonth() + 1
      )}.${task.createdAt.getFullYear()} ${addZero(
        task.createdAt.getHours()
      )}:${addZero(task.createdAt.getMinutes())}`;

      if (i === 0) {
        entry = `<li class="tasks__task task task-header">
            <div class="task__text">Описание задачи</div>
            <div class="task__options task__options_type_status">Статус</div>
            <div class="task__options task__options_type_update">Изменить</div>
            <div class="task__options task__options_type_delete">Удалить</div>
            <div class="task__createdAt">Создано</div>
          </li><hr/>`;
      }

      entry += `<li id=${task.id} class="tasks__task task task-${task.id}">
          <div class="task__text text-task" title='Теги - ${task.tags.join(
            ", "
          )}'>${task.text}</div>
          <div class="task__options task__options_type_status status"><input class="status__input" type="checkbox" ${
            task.status ? "checked" : ""
          }/></div>
          <div class="task__options task__options_type_update update"><button class="update__button _task-button"></button></div>
          <div class="task__options task__options_type_delete delete"><button class="delete__button _task-button"></button></div>
          <div class="task__createdAt">${dateString}</div>
    </li>${i === array.length - 1 ? "<hr/>" : ""}`;

      return entry;
    })
    .join("")}`;

  const buttonsDelete = listTasks.querySelectorAll(".delete__button");

  for (const button of buttonsDelete) {
    button.addEventListener("click", async (e) => {
      const target = e.target as HTMLButtonElement;
      const id = target?.parentElement?.parentElement?.id;

      if (id) {
        const task = listTasks.querySelector(`.task-${id}`) as HTMLElement;

        task.remove();

        const items = listTasks.querySelectorAll(
          ".task"
        ) as NodeListOf<HTMLElement>;

        if (items.length === 1) {
          listTasks.innerHTML = "";
        }

        await LocalStorage.delete(id);
      }
    });
  }

  const buttonsUpdate = listTasks.querySelectorAll(".update__button");

  for (const button of buttonsUpdate) {
    button.addEventListener("click", async (e) => {
      const target = e.target as HTMLButtonElement;
      const id = target?.parentElement?.parentElement?.id;

      if (id) {
        showModalUpdateTask(element, id);
      }
    });
  }

  const inputsStatus = listTasks.querySelectorAll(
    ".status__input"
  ) as NodeListOf<HTMLInputElement>;

  for (const input of inputsStatus) {
    input.addEventListener("click", async (e) => {
      const target = e.target as HTMLButtonElement;
      const id = target?.parentElement?.parentElement?.id;

      if (id) {
        await LocalStorage.update(id, "", input.checked);
      }
    });
  }
}

function addZero(number: number): string {
  if (number < 10) {
    return `0${String(number)}`;
  }

  return String(number);
}
