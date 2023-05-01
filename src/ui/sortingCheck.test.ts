import { createStartUI } from "./createStartUI";

const sleep = (delay: number) => setTimeout(() => delay, delay);

describe("sorting check", () => {
  let element: HTMLElement;
  let buttonFilter: HTMLButtonElement;

  beforeEach(async () => {
    element = document.createElement("div");
    element.id = "app";

    await createStartUI(element);

    const buttonCreate = element.querySelector(
      ".app__button-create-task"
    ) as HTMLButtonElement;

    buttonCreate.click();

    const inputCreate = element.querySelector(
      ".body-modal-create__input_type_create"
    ) as HTMLInputElement;

    inputCreate.value = "Поесть кашу";

    const inputTags = element.querySelector(
      ".body-modal-create__input_type_tags"
    ) as HTMLInputElement;

    inputTags.value = "Каша, кушать, вкусно";

    const create = element.querySelector(
      ".footer-content-modal__button-create"
    ) as HTMLElement;

    create.click();

    buttonFilter = element.querySelector(
      ".app-buttons-up__button-filter"
    ) as HTMLButtonElement;
  });

  it("checking insufficient parameter selection", async () => {
    buttonFilter.click();

    const buttonAlphabet = element.querySelector(
      ".item-filter-body__radio_pos_left-alphabet"
    ) as HTMLInputElement;

    buttonAlphabet.checked = true;
    buttonAlphabet.dispatchEvent(new Event("change"));

    const filter = element.querySelector(
      ".footer-content-modal__button-filter"
    ) as HTMLButtonElement;

    filter.click();

    const errorMessage = element.querySelector(
      ".body-modal__error-message"
    ) as HTMLElement;

    const displayMessage = window.getComputedStyle(errorMessage).display;

    expect(displayMessage).toBe("block");
  });

  describe("alphabetical sorting", () => {
    it("ascending", async () => {
      buttonFilter.click();

      const buttonAlphabet = element.querySelector(
        ".item-filter-body__radio_pos_left-alphabet"
      ) as HTMLInputElement;

      buttonAlphabet.checked = true;
      buttonAlphabet.dispatchEvent(new Event("change"));

      const buttonAscending = element.querySelector(
        ".item-filter-body__radio_pos_right-alphabet1"
      ) as HTMLInputElement;

      buttonAscending.checked = true;
      buttonAscending.dispatchEvent(new Event("change"));

      const filter = element.querySelector(
        ".footer-content-modal__button-filter"
      ) as HTMLButtonElement;

      filter.click();

      await sleep(100);

      const tasks = element.querySelectorAll(
        ".task"
      ) as NodeListOf<HTMLElement>;
      const taskText = tasks[1].querySelector(".task__text") as HTMLElement;

      expect(taskText.innerHTML).toBe("Поесть кашу");
    });

    it("descending", async () => {
      buttonFilter.click();

      const buttonAlphabet = element.querySelector(
        ".item-filter-body__radio_pos_left-alphabet"
      ) as HTMLInputElement;

      buttonAlphabet.checked = true;
      buttonAlphabet.dispatchEvent(new Event("change"));

      const buttonDescending = element.querySelector(
        ".item-filter-body__radio_pos_right-alphabet2"
      ) as HTMLInputElement;

      buttonDescending.checked = true;
      buttonDescending.dispatchEvent(new Event("change"));

      const filter = element.querySelector(
        ".footer-content-modal__button-filter"
      ) as HTMLButtonElement;

      filter.click();

      await sleep(100);

      const tasks = element.querySelectorAll(
        ".task"
      ) as NodeListOf<HTMLElement>;
      const taskText = tasks[1].querySelector(".task__text") as HTMLElement;

      expect(taskText.innerHTML).toBe("Создать задачу");
    });
  });

  describe("sorting by date", () => {
    it("new ones first", async () => {
      buttonFilter.click();

      const buttonDate = element.querySelector(
        ".item-filter-body__radio_pos_left-date"
      ) as HTMLInputElement;

      buttonDate.checked = true;
      buttonDate.dispatchEvent(new Event("change"));

      const buttonNewOnes = element.querySelector(
        ".item-filter-body__radio_pos_right-date1"
      ) as HTMLInputElement;

      buttonNewOnes.checked = true;
      buttonNewOnes.dispatchEvent(new Event("change"));

      const filter = element.querySelector(
        ".footer-content-modal__button-filter"
      ) as HTMLButtonElement;

      filter.click();

      await sleep(100);

      const tasks = element.querySelectorAll(
        ".task"
      ) as NodeListOf<HTMLElement>;
      const taskText = tasks[1].querySelector(".task__text") as HTMLElement;

      expect(taskText.innerHTML).toBe("Поесть кашу");
    });

    it("first the old ones", async () => {
      buttonFilter.click();

      const buttonDate = element.querySelector(
        ".item-filter-body__radio_pos_left-date"
      ) as HTMLInputElement;

      buttonDate.checked = true;
      buttonDate.dispatchEvent(new Event("change"));

      const buttonOldOnes = element.querySelector(
        ".item-filter-body__radio_pos_right-date2"
      ) as HTMLInputElement;

      buttonOldOnes.checked = true;
      buttonOldOnes.dispatchEvent(new Event("change"));

      const filter = element.querySelector(
        ".footer-content-modal__button-filter"
      ) as HTMLButtonElement;

      filter.click();

      await sleep(100);

      const tasks = element.querySelectorAll(
        ".task"
      ) as NodeListOf<HTMLElement>;
      const taskText = tasks[1].querySelector(".task__text") as HTMLElement;

      expect(taskText.innerHTML).toBe("Создать задачу");
    });
  });

  describe("sorting by status", () => {
    it("on the completed", async () => {
      let tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;
      let taskStatus = tasks[1].querySelector(
        ".status__input"
      ) as HTMLInputElement;

      taskStatus.checked = true;
      taskStatus.dispatchEvent(new Event("change"));

      buttonFilter.click();

      const buttonStatus = element.querySelector(
        ".item-filter-body__radio_pos_left-status"
      ) as HTMLInputElement;

      buttonStatus.checked = true;
      buttonStatus.dispatchEvent(new Event("change"));

      const buttonCompleted = element.querySelector(
        ".item-filter-body__radio_pos_right-status1"
      ) as HTMLInputElement;

      buttonCompleted.checked = true;
      buttonCompleted.dispatchEvent(new Event("change"));

      const filter = element.querySelector(
        ".footer-content-modal__button-filter"
      ) as HTMLButtonElement;

      filter.click();

      tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;
      taskStatus = tasks[1].querySelector(".status__input") as HTMLInputElement;

      expect(taskStatus.checked).toBe(true);
    });

    it("on outstanding", async () => {
      let tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;
      let taskStatus = tasks[1].querySelector(
        ".status__input"
      ) as HTMLInputElement;

      taskStatus.checked = true;
      taskStatus.dispatchEvent(new Event("change"));

      buttonFilter.click();

      const buttonStatus = element.querySelector(
        ".item-filter-body__radio_pos_left-status"
      ) as HTMLInputElement;

      buttonStatus.checked = true;
      buttonStatus.dispatchEvent(new Event("change"));

      const buttonOutstanding = element.querySelector(
        ".item-filter-body__radio_pos_right-status2"
      ) as HTMLInputElement;

      buttonOutstanding.checked = true;
      buttonOutstanding.dispatchEvent(new Event("change"));

      const filter = element.querySelector(
        ".footer-content-modal__button-filter"
      ) as HTMLButtonElement;

      filter.click();

      await sleep(100);

      tasks = element.querySelectorAll(".task") as NodeListOf<HTMLElement>;
      taskStatus = tasks[1].querySelector(".status__input") as HTMLInputElement;

      expect(taskStatus.checked).toBe(false);
    });
  });

  describe("tagging", () => {
    it("sorting check", async () => {
      buttonFilter.click();

      const buttonTag = element.querySelector(
        ".item-filter-body__radio_pos_left-tag"
      ) as HTMLInputElement;

      buttonTag.checked = true;
      buttonTag.dispatchEvent(new Event("change"));

      const inputTags = element.querySelector(
        ".item-filter-body__tag-input"
      ) as HTMLInputElement;

      inputTags.value = "Вкусно, каша";

      const filter = element.querySelector(
        ".footer-content-modal__button-filter"
      ) as HTMLButtonElement;

      filter.click();

      await sleep(100);

      const tasks = element.querySelectorAll(
        ".task"
      ) as NodeListOf<HTMLElement>;
      const taskText = tasks[1].querySelector(".task__text") as HTMLElement;

      expect(taskText.innerHTML).toBe("Поесть кашу");
    });
  });
});
