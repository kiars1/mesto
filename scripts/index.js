import { initialCards } from "./initial-сards.js";
import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');

const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNew = document.querySelector('.popup_type_new-card');
const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementNew = popupNew.querySelector('.popup__form');

export const popupImage = document.querySelector('.popup_type_image');
export const popupFigure = popupImage.querySelector('.popup__image');
export const popupFigcaption = popupImage.querySelector('.popup__subtitle');

const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const titleInput = document.querySelector('#TitleInput');
const photoInput = document.querySelector('#PhotoInput');

const photoList = document.querySelector('.photo__list');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disable',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__form-error_active'
};

const editFormValidator = new FormValidator(validationConfig, formElementEdit);
const cardFormValidator = new FormValidator(validationConfig, formElementNew);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//Функция добавлния карточки
const createCard = (name, link, cardSelector) => {
  const card = new Card(name, link, cardSelector);
  const cardElement = card.generateCard()
  
  photoList.prepend(cardElement);
}

 // Добавляем заготовленные карточки
initialCards.reverse().forEach((item) => {
  createCard(item.name, item.link, '.photo-template');
});

//Функция открытия переданного popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupKey);
}

//Функция закрытия переданного popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupKey);
}

//Закрытия popup нажатием на крестик
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__button-close') || (evt.target.classList.contains('popup'))) {
      closePopup(popup);
    }
  }) 
})

//Закрытие popup на esc
function closePopupKey (evt) {
  if (evt.key == "Escape") {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  }
}

//Функция открытия popup'а редактирования профиля
function openEditProfilePopup() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  editFormValidator.refreshInputValidity();
}

//Функция открытия popup'а добавления фотокарточки
function openAddCardPopup() {
  openPopup(popupNew);
  formElementNew.reset();
  cardFormValidator.refreshInputValidity();
}

//Функция сохранения данных popup'а в профиле пользователя
function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}

//Добовление новой карточки через popup
function formAddCardSubmitHandler(evt) {
  evt.preventDefault();
  createCard(titleInput.value, photoInput.value, '.photo-template');
  closePopup(popupNew); 
}

buttonEdit.addEventListener('click', openEditProfilePopup);
buttonAdd.addEventListener('click', openAddCardPopup);
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementNew.addEventListener('submit', formAddCardSubmitHandler);