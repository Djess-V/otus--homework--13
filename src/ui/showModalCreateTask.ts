import { LocalStorage } from "../api/LocalStorage";
import { Task } from "../api/Task";
import { drawTasks } from "./drawTasks";

interface CreateModal {
  (element: HTMLElement): void;
}

export const showModalCreateTask: CreateModal = (element) => {
  element.insertAdjacentHTML(
    "beforeend",
    `
   <div class="app__modal-backdrop"></div>
      <div
        class='app__modal-wrapper modal-wrapper'
      >
        <div class="modal-wrapper__modal modal ">
          <div
            class="modal__content content-modal"
          >
            <div class="content-modal__header">
              <h3 class="content-modal__header_title">Добавить задачу</h3>
            </div>
            <div class='content-modal__body body-modal body-modal-create'>
                <label class='body-modal-create__label'>Опишите задачу</label>
                <input class='body-modal-create__input_type_create _input'/>
                <br/>                  
                <label class='body-modal-create__label'>Теги</label>
                <input class='body-modal-create__input_type_tags _input' placeholder='Вводите теги через запятую'/> 
                <p class='body-modal__message'>Теги отображаются при наведении курсора мыши на текст задачи</p>                 
                <p class='body-modal__error-message'>Поле описания задачи не должно быть пустым, теги можно не заполнять или заполнить в соответствии с требованиями</p>
            </div>
            <div class="content-modal__footer footer-content-modal">
              <button class="footer-content-modal__button-create _button">
                  Добавить
                </button>              
                <button class="footer-content-modal__button-cancel _button">
                Отмена
              </button>            
            </div>
          </div>
        </div>
      </div>
   `
  );

  const buttonCancel = element.querySelector(
    ".footer-content-modal__button-cancel"
  ) as HTMLElement;

  buttonCancel.addEventListener("click", () => {
    const modalBackdrop = element.querySelector(
      ".app__modal-backdrop"
    ) as HTMLElement;
    const modalWrapper = element.querySelector(
      ".app__modal-wrapper"
    ) as HTMLElement;

    modalBackdrop.remove();
    modalWrapper.remove();
  });

  const buttonCreate = element.querySelector(
    ".footer-content-modal__button-create"
  ) as HTMLElement;

  buttonCreate.addEventListener("click", async () => {
    const inputText = element.querySelector(
      ".body-modal-create__input_type_create"
    ) as HTMLInputElement;

    const inputTags = element.querySelector(
      ".body-modal-create__input_type_tags"
    ) as HTMLInputElement;

    if (
      inputText.value === "" ||
      !/^$|^([а-яёА-ЯЁa-zA-Z0-9\s]+\s?)$|^([а-яёА-ЯЁa-zA-Z0-9\s]+,\s?)+/.test(
        inputTags.value
      )
    ) {
      const errorMessage = element.querySelector(
        ".body-modal__error-message"
      ) as HTMLElement;

      errorMessage.style.display = "block";

      setTimeout(() => {
        errorMessage.style.display = "";
      }, 7000);
    } else {
      const tasks = await LocalStorage.createTask(
        new Task(inputText.value, inputTags.value)
      );

      drawTasks(element, tasks);

      buttonCancel.click();
    }
  });
};
