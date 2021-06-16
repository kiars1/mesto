//Добавляем валидацию
function enableValidation() {
  formElementNew.addEventListener('submit', handleFormSubmit);
  formElementNew.addEventListener('input', handleFormInput);
  formElementEdit.addEventListener('submit', handleFormSubmit);
  formElementEdit.addEventListener('input', handleFormInput);
}

//Обнуляем Submit
function handleFormSubmit(evt) {
  evt.preventDefault();
}

//
function handleFormInput(evt) {
  const input = evt.target;
  const form = evt.currentTarget;

  setFieldError(input);
  setSubmitButtonState(form);
}

//Выводит сообщение об ошибке
function setFieldError(input) {
  const span = document.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
}

//Активирует или деактивирует кнопку Сохранить
function setSubmitButtonState(form) {
  const button = form.querySelector('.popup__button-save');
  const isValid = form.checkValidity();

  if (isValid){
    button.classList.remove('popup__button-save_disable');
    button.removeAttribute('disabled');
  } else {
    button.classList.add('popup__button-save_disable');
    button.setAttribute('disabled', 'disabled');
  }
}

enableValidation()