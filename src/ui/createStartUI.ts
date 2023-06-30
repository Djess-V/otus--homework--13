import { drawTasks } from "./drawTasks";
import { showModalCreateTask } from "./showModalCreateTask";
import { showModalFilter } from "./showModalFilter";
import { storage } from "../storage/storage";

interface CreateUI {
  (element: HTMLElement): void;
}

export const createStartUI: CreateUI = async (element) => {
  let tasks = await storage.createStorage();

  element.innerHTML = `
   <h1 class="app__title">Календарь задач</h1>
   <form class="app__form-search form-search"><input class="form-search__inpit _input" required/>
   <button class="form-search__button _button" type="submit">Найти задачу по описанию</button>
   <p class='form-search__message'>По вашему запросу записей не найдено!</p></form>
   <div class="app__buttons-up app-buttons-up">
   <button class="app-buttons-up__button-filter _button">Фильтр</button>
   <button class="app-buttons-up__button-fetch-all _button">Получить все записи</button>
   </div> 
   <p class='app__message'>У вас нет записей!</p>  
   <ol class="app__tasks tasks"></ol>
   <button class="app__button-create-task _button">Создать задачу</button>
   `;

  drawTasks(element, tasks);

  const formSearch = element.querySelector(
    ".app__form-search"
  ) as HTMLFormElement;

  formSearch.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputSearch = element.querySelector(
      ".form-search__inpit"
    ) as HTMLInputElement;

    tasks = await storage.search(inputSearch.value.toLowerCase().trim());

    if (tasks.length === 0) {
      const message = element.querySelector(
        ".form-search__message"
      ) as HTMLElement;

      message.style.opacity = "1";

      setTimeout(() => {
        message.style.opacity = "0";
      }, 3000);
    } else {
      drawTasks(element, tasks);
    }

    inputSearch.value = "";
  });

  const buttonFilter = element.querySelector(
    ".app-buttons-up__button-filter"
  ) as HTMLButtonElement;

  buttonFilter.addEventListener("click", () => {
    showModalFilter(element);
  });

  const buttonFetchAll = element.querySelector(
    ".app-buttons-up__button-fetch-all"
  ) as HTMLButtonElement;

  buttonFetchAll.addEventListener("click", async (e) => {
    tasks = await storage.fetchAll();

    if (tasks.length === 0) {
      const appMessage = element.querySelector(".app__message") as HTMLElement;

      appMessage.style.display = "block";

      setTimeout(() => {
        appMessage.style.display = "";
      }, 3000);
    } else {
      drawTasks(element, tasks);
    }
  });

  const buttonCreateTask = element.querySelector(
    ".app__button-create-task"
  ) as HTMLButtonElement;

  buttonCreateTask.addEventListener("click", () => {
    showModalCreateTask(element);
  });
};
