export class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    this._buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  }

  //Активирует Алярм!
  _addInputError(inputElement, errorMessage) {
    const errorElement =  this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }
  
  //Деактивирует Алярм!
  _removeInputError(inputElement) {
  const errorElement =  this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //Говорим пользователю чтобы он убрар кота от клавиатуры и написал нормально
  _checkinputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._addInputError(inputElement, inputElement.validationMessage);
    } else {
      this._removeInputError(inputElement);
    }
  }

  //Засылаем шпьёнов и получаем информацию от кротов.
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkinputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      })
    })
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  //Тут мы берем под потранаж кнопку "Сохранить"
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
      } 
  }

  //Сбрасываем Валидацию  
  refreshInputValidity() {
    this._toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach((inputElement) => {
      this._removeInputError(inputElement)
    });
  }

  //Включаем карательную машину валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners();
  }
}