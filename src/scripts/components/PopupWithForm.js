import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ({popupElement, submitCallback}, keyClose) {
    super(popupElement, keyClose);

    this._submitCallback = submitCallback;
    this._formElement = popupElement.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._saveButton = this._popupElement.querySelector('.popup__button-save');
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

  //Закрытие popup со сбрасыванием формы.
  close() {
    super.close();
    this._formElement.reset()
  }
}