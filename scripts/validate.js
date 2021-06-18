//Активирует Алярм!
const addInputError = (formElement, inputElement, errorMessage, rest) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(rest.inputErrorClass);
  errorElement.classList.add(rest.errorClass);
  errorElement.textContent = errorMessage;
}

//Деактивирует Алярм!
const removeInputError = ((formElement, inputElement, rest) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(rest.inputErrorClass);
  errorElement.classList.remove(rest.errorClass);
  errorElement.textContent = '';
})

//Говорим пользователю чтобы он убрар кота от клавиатуры и написал нормально
const checkinputValidity = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    addInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } 
  else {
    removeInputError(formElement, inputElement, rest);
  }
}

//Засылаем шпьёнов и получаем информацию от кротов.
const setEventListeners = (formElement, rest) => {
  const inputList = Array.from(formElement.querySelectorAll(rest.inputSelector));
  const buttonElement = formElement.querySelector(rest.submitButtonSelector);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkinputValidity(formElement, inputElement, rest);
        toggleButtonState(inputList, buttonElement, rest);
      })
  })
}

//Включаем карательную машину валидации
const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      })
      setEventListeners(formElement, rest);
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
})}

//Тут мы берем под потранаж кнопку "Сохранить"
function toggleButtonState(inputList, buttonElement, rest) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(rest.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(rest.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  } 
}

//Сбрасываем валидацию
const refreshinputValidity = (formElement) => {
  const rest = validationConfig;
  const inputList = Array.from(formElement.querySelectorAll(rest.inputSelector));
  const buttonElement = formElement.querySelector(rest.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    removeInputError(formElement, inputElement, rest);
    toggleButtonState(inputList, buttonElement, rest);
  });
}

enableValidation(validationConfig);
