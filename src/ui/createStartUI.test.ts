import { createStartUI } from "./createStartUI";

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

describe("createStartUI", () => {
  let element: HTMLElement;

  beforeEach(async () => {
    element = document.createElement("div");
    element.id = "app";

    await createStartUI(element);
  });

  it("rendering test UI", () => {
    const tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;

    expect(tasks.length).toBe(2);
  });

  it("search check", async () => {
    const searchInput = element.querySelector(
      ".form-search__inpit"
    ) as HTMLInputElement;
    const search = element.querySelector(
      ".app__form-search"
    ) as HTMLFormElement;

    searchInput.value = "создать";
    search.submit();

    const tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;
    const taskText = tasks[1].querySelector(".task__text") as HTMLElement;

    expect(taskText.innerHTML).toBe("Создать задачу");

    searchInput.value = "Hello World!";
    search.submit();
    await sleep(100);

    const message = element.querySelector(
      ".form-search__message"
    ) as HTMLElement;
    const opacityMessage = window.getComputedStyle(message).opacity;

    expect(opacityMessage).toBe("1");
  });

  it("check the button to delete", () => {
    let tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;

    const buttonDelete = tasks[1].querySelector(
      ".delete__button"
    ) as HTMLButtonElement;

    buttonDelete.click();

    tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;

    expect(tasks.length).toBe(0);
  });

  it("check query all records", () => {
    const buttonFetchAll = element.querySelector(
      ".app-buttons-up__button-fetch-all"
    ) as HTMLButtonElement;

    buttonFetchAll.click();

    const tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;

    expect(tasks.length).toBe(2);
  });

  it("check update button", () => {
    const tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;

    const buttonUpdate = tasks[1].querySelector(
      ".update__button"
    ) as HTMLButtonElement;

    buttonUpdate.click();

    let inputUpdate = element.querySelector(
      ".body-modal-update__input"
    ) as HTMLInputElement;

    inputUpdate.value = "Создать запись";

    let update = element.querySelector(
      ".footer-content-modal__button-update"
    ) as HTMLElement;

    update.click();

    const taskText = tasks[1].querySelector(".task__text") as HTMLElement;

    expect(taskText.innerHTML).toBe("Создать запись");

    buttonUpdate.click();

    inputUpdate = element.querySelector(
      ".body-modal-update__input"
    ) as HTMLInputElement;

    inputUpdate.value = "";

    update = element.querySelector(
      ".footer-content-modal__button-update"
    ) as HTMLElement;

    update.click();

    const errorMessage = element.querySelector(
      ".body-modal__error-message"
    ) as HTMLElement;

    const displayMessage = window.getComputedStyle(errorMessage).display;

    expect(displayMessage).toBe("block");
  });

  it("check the create button", async () => {
    const buttonCreate = element.querySelector(
      ".app__button-create-task"
    ) as HTMLButtonElement;

    buttonCreate.click();

    const create = element.querySelector(
      ".footer-content-modal__button-create"
    ) as HTMLElement;

    create.click();

    const errorMessage = element.querySelector(
      ".body-modal__error-message"
    ) as HTMLElement;

    const displayMessage = window.getComputedStyle(errorMessage).display;

    expect(displayMessage).toBe("block");

    const inputCreate = element.querySelector(
      ".body-modal-create__input_type_create"
    ) as HTMLInputElement;

    inputCreate.value = "Сходить в магазин";

    create.click();

    await sleep(1000);

    const tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;
    const taskText = tasks[2].querySelector(".task__text") as HTMLElement;

    expect(tasks.length).toBe(3);
    expect(taskText.innerHTML).toBe("Сходить в магазин");
  });

  it("checking for status changes and retention", () => {
    let tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;
    let taskStatus = tasks[1].querySelector(
      ".status__input"
    ) as HTMLInputElement;

    taskStatus.checked = true;
    taskStatus.dispatchEvent(new Event("change"));

    const buttonFetchAll = element.querySelector(
      ".app-buttons-up__button-fetch-all"
    ) as HTMLButtonElement;

    buttonFetchAll.click();

    tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;
    taskStatus = tasks[1].querySelector(".status__input") as HTMLInputElement;

    expect(taskStatus.checked).toBe(true);
  });
});
