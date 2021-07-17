import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ({popupElement, submitCallback}) {
    super(popupElement);

    this._submitCallback = submitCallback;
    this._formElement = popupElement.querySelector('.popup__form')
  }
  
  //Кушаем значения в инпутах
  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__input')
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

      this._submitCallback(this._getInputValues ())
    })
  }

  //Закрытие popup со сбрасыванием формы.
  close() {
    super.close();
    this._formElement.reset()
  }
}