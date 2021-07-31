import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor (popupElement, submitHandler, keyClose) {
    super(popupElement, keyClose);

    this._submitHandler = submitHandler;
    this._saveButton = this._popupElement.querySelector('.popup__button-save');
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card);
    })
  }
  
  //Функция отображения загрузки
  renderLoading(loading, text) {
    if (loading) {
      this._saveButton.classList.add('popup__button-save_active') //Просто css с простой анимацией. Люблю я это дело.
      this._saveButton.textContent = text;
    } else {
      this._saveButton.classList.remove('popup__button-save_active')
      this._saveButton.textContent = text;
    }
  }

  open(card) {
    this._card = card;
    super.open();
  }
}