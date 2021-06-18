const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNew = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementNew = popupNew.querySelector('.popup__form');
const popupFigure = popupImage.querySelector('.popup__image');
const popupFigcaption = popupImage.querySelector('.popup__subtitle');

const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const titleInput = document.querySelector('#TitleInput');
const photoInput = document.querySelector('#PhotoInput');

const photoList = document.querySelector('.photo__list');
const photoTemplate = document.querySelector('.photo-template').content;
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disable',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__form-error_active'
};

//Функция открытия переданного popup
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupKey);
}

//Функция закрытия переданного popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupKey);
}

//Закрытия popup нажатием на крестик
popups.forEach((closeButton) => {
  closeButton.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__button-close') || (evt.target.classList.contains('popup'))) {
      closePopup(closeButton);
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
  refreshFormValidationState(popupEdit);
}

//Функция открытия popup'а добавления фотокарточки
function openAddCardPopup() {
  openPopup(popupNew);
  formElementNew.reset();
  refreshFormValidationState(popupNew);
}

//Функция сохранения данных popup'а в профиле пользователя
function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}

//Функция добавления карточки
function addCard(card) {
  photoList.prepend(card);
}

//Функция добавления карточек из масива
initialCards.reverse().forEach(addInitialCards);

function addInitialCards(element) {
  addCard(createCard(element.name, element.link));
}

function createCard(title, image){
  const photoElement = photoTemplate.cloneNode(true);
  const cardImage = photoElement.querySelector('.photo__image');
  photoElement.querySelector('.photo__title').textContent = title;
  cardImage.src = image;
  cardImage.alt = title;
  
  deletePhotoListeners(photoElement);
  likePhotoListeners(photoElement);
  openPhotoPopupListeners(photoElement);
  return photoElement;
};

//Открытие popup с картинкой
function openPhotoPopup(evt) {
  const cardImage = evt.target.closest('.photo__image');
  popupFigure.src = cardImage.src;
  popupFigure.alt = cardImage.alt;
  popupFigcaption.textContent = evt.target.closest('.photo__container').textContent;
  openPopup(popupImage);
}
function openPhotoPopupListeners(element) {
  element.querySelector('.photo__image').addEventListener('click', openPhotoPopup);
}

//Добовление новой карточки через popup
function formAddCardSubmitHandler(evt){
  evt.preventDefault();
  addCard(createCard(titleInput.value, photoInput.value));
  closePopup(popupNew);
}

//Функция удаления фотокарточки
function deletePhoto (evt){
evt.target.closest('.photo__container').remove();
}
function deletePhotoListeners(element) {
  element.querySelector('.photo__trash-button').addEventListener('click', deletePhoto);
}

//Функция добавления/удаления ЛОЙСА
function likePhoto (evt){
  evt.target.classList.toggle('photo__like-button_active');
}
function likePhotoListeners(element) {
  element.querySelector('.photo__like-button').addEventListener('click', likePhoto);
}

buttonEdit.addEventListener('click', openEditProfilePopup);
buttonAdd.addEventListener('click', openAddCardPopup);
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementNew.addEventListener('submit', formAddCardSubmitHandler);