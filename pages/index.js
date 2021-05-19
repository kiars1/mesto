
let buttonEdit = document.querySelector('.profile__button-edit');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__button-close');
let buttonSave = document.querySelector('.popup__button-save');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-info');

function popupOpen() {
  popup.classList.add('popup_oppened');
  nameInput.value = `${profileName.textContent}`;
  jobInput.value = `${profileDescription.textContent}`;
}
buttonEdit.addEventListener('click', popupOpen);

function popupClose() {
  popup.classList.remove('popup_oppened');
}
buttonClose.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);
buttonSave.addEventListener('click', popupClose);

