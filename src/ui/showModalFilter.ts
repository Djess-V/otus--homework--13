import { LocalStorage } from "../api/LocalStorage";
import { drawTasks } from "./drawTasks";
import { Task } from "../api/Task";
import { filterData } from "../api/constants";

interface IFilterModal {
  (element: HTMLElement): void;
}

export const showModalFilter: IFilterModal = (element) => {
  const modalBody = `${filterData
    .map(
      (item, i) => `
    <div class='filter-body__item item-filter-body'>

      <div class='item-filter-body__left'>
        <label class='item-filter-body__label item-filter-body__label_type_left' for='${
          item.id
        }' >${item.title}</label>
        <input class='item-filter-body__radio item-filter-body__radio_pos_left item-filter-body__radio_pos_left-${
          item.id
        }' type='radio' id='${item.id}' name='filter' value='${item.id}' />
      </div>

      <div id='rBlock_${
        item.id
      }' class='item-filter-body__right right-filter-body item-filter-body__right_name_filter-${
        item.id
      }' >
      
        <div class='right-filter-body__up'>
          ${
            i !== 3
              ? `
          <label class='item-filter-body__label' for='${item.id}Up' >${
                  item.subTitle1
                }</label>
          <input id='${
            item.id
          }Up' class='item-filter-body__radio item-filter-body__radio_pos_right item-filter-body__radio_pos_right-${
                  item.id
                }1' type='radio' name='filter-${i + 1}' value='${item.id}1' />`
              : `<label class='item-filter-body__label_type_tag' for='${item.id}' >${item.subTitle1}</label>
          <input id='${item.id}' class="item-filter-body__tag-input _input" placeholder='Через запятую' />`
          }
        </div>

        ${
          i !== 3
            ? `<div class='right-filter-body__down'>
          <label class='item-filter-body__label' for='${item.id}Down' >${
                item.subTitle2
              }</label>
          <input class='item-filter-body__radio item-filter-body__radio_pos_right item-filter-body__radio_pos_right-${
            item.id
          }2' type='radio' id='${item.id}Down' name='filter-${i + 1}' value='${
                item.id
              }2' />
        </div>`
            : ""
        }                                      
      </div>
                                 
    </div>`
    )
    .join("")}`;

  element.insertAdjacentHTML(
    "beforeend",
    `
      <div class="app__modal-backdrop"></div>
      <div class='app__modal-wrapper modal-wrapper'>
        <div class="modal-wrapper__modal modal ">
          <div class="modal__content content-modal">
            <div class="content-modal__header">
              <h3 class="content-modal__header_title">Сортировать по:</h3>
            </div>
            <div class='content-modal__body body-modal filter-body'>

              ${modalBody}                
              <p class='body-modal__error-message'>Недостаточно данных для сортировки или теги введены некорректно</p>  

            </div>
            <div class="content-modal__footer footer-content-modal">
              <button class="footer-content-modal__button-filter _button">
                Сортировать
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
  ) as HTMLButtonElement;

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

  const tagInput = element.querySelector(
    ".item-filter-body__tag-input"
  ) as HTMLInputElement;

  const radioLeft = element.querySelectorAll(
    ".item-filter-body__radio_pos_left"
  ) as NodeListOf<HTMLInputElement>;

  for (const radioButton of radioLeft) {
    radioButton.addEventListener("change", (e) => {
      const radio = e.target as HTMLInputElement;

      const rightBlocks = element.querySelectorAll(
        `.right-filter-body`
      ) as NodeListOf<HTMLElement>;

      for (const rBlock of rightBlocks) {
        if (rBlock.id === `rBlock_${radio.value}`) {
          rBlock.style.display = "grid";
        } else {
          rBlock.style.display = "none";

          const rightInputs = rBlock.querySelectorAll(
            `.item-filter-body__radio`
          ) as NodeListOf<HTMLInputElement>;

          for (const input of rightInputs) {
            input.checked = false;
          }

          tagInput.value = "";
        }
      }
    });
  }

  const buttonFilter = element.querySelector(
    ".footer-content-modal__button-filter"
  ) as HTMLButtonElement;

  buttonFilter.addEventListener("click", async () => {
    let tasks: Array<Task>;
    const radioInputs = element.querySelectorAll(
      ".item-filter-body__radio"
    ) as NodeListOf<HTMLInputElement>;

    const checkedRadios = Array.from(radioInputs).filter(
      (item) => item.checked
    );

    if (checkedRadios.length === 2) {
      tasks = await LocalStorage.sortBy(
        checkedRadios[0].value,
        checkedRadios[1].value
      );
      drawTasks(element, tasks);
      buttonCancel.click();
    } else if (
      checkedRadios.length === 1 &&
      checkedRadios[0].value === "tag" &&
      tagInput.value !== "" &&
      /^([а-яА-Яa-zA-Z0-9]+\s?)$|^([а-яА-Яa-zA-Z0-9]+,\s?)+/.test(
        tagInput.value
      )
    ) {
      tasks = await LocalStorage.sortBy(checkedRadios[0].value, tagInput.value);
      drawTasks(element, tasks);
      buttonCancel.click();
    } else {
      const errorMessage = element.querySelector(
        `.body-modal__error-message`
      ) as HTMLElement;

      errorMessage.style.display = "block";

      setTimeout(() => {
        errorMessage.style.display = "";
      }, 5000);
    }
  });
};
