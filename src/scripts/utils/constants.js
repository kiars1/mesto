export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');

export const buttonEdit = document.querySelector('.profile__button-edit');
export const buttonAdd = document.querySelector('.profile__button-add');

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNew = document.querySelector('.popup_type_new-card');
export const formElementEdit = popupEdit.querySelector('.popup__form');
export const formElementNew = popupNew.querySelector('.popup__form');

export const popupImage = document.querySelector('.popup_type_image');

export const nameInput = document.querySelector('#nameInput');
export const jobInput = document.querySelector('#jobInput');

export const photoList = document.querySelector('.photo__list');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disable',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__form-error_active'
};

export const keyClose = 'Escape';