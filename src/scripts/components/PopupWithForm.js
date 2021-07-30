import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ({popupElement, submitCallback}, keyClose) {
    super(popupElement, keyClose);

    this._submitCallback = submitCallback;
    this._formElement = popupElement.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }
  
  //Кушаем значения в инпутах
  _getInputValues() {
      this.inputValue = {}

      this._inputList.forEach(inputElement => {
        this.inputValue[inputElement.name] = inputElement.value;
      });
      return this.inputValue;
  }

  //Слушатель-подслушатель
  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitCallback(this._getInputValues())
    })
  }

  //Закрытие popup со сбрасыванием формы.
  close() {
    super.close();
    this._formElement.reset()
  }
}