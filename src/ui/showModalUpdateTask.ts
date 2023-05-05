import { storage } from "../storage/storage";

interface UpdateModal {
  (element: HTMLElement, id: string): void;
}

export const showModalUpdateTask: UpdateModal = (element, id) => {
  const task = element.querySelector(`.task-${id}`) as HTMLElement;

  const textTask = task.querySelector(".task__text") as HTMLElement;

  element.insertAdjacentHTML(
    "beforeend",
    `
   <div class="app__modal-backdrop"></div>
      <div class='app__modal-wrapper modal-wrapper'>
        <div class="modal-wrapper__modal modal ">
          <div class="modal__content content-modal">
            <div class="content-modal__header">
              <h3 class="content-modal__header_title">Обновить задачу</h3>
            </div>
            <div class='content-modal__body body-modal body-modal-update'>               
              <label>Внесите изменения</label>
              <input class='body-modal-update__input _input' />
              <p class='body-modal__error-message'>Пустая строка недопустима</p>
            </div>
            <div class="content-modal__footer footer-content-modal">
              <button class="footer-content-modal__button-update _button">
                Обновить
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

  const input = element.querySelector(
    ".body-modal-update__input"
  ) as HTMLInputElement;

  input.setAttribute("value", `${textTask.textContent}`);

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

  const buttonUpdate = element.querySelector(
    ".footer-content-modal__button-update"
  ) as HTMLElement;

  buttonUpdate.addEventListener("click", async () => {
    if (input.value === "") {
      const errorMessage = element.querySelector(
        ".body-modal__error-message"
      ) as HTMLElement;

      errorMessage.style.display = "block";

      setTimeout(() => {
        errorMessage.style.display = "";
      }, 3000);
    } else {
      const newText = input.value.replace(/[<>]/gi, "");

      textTask.innerHTML = newText;

      buttonCancel.click();

      await storage.update(id, newText);
    }
  });
};
