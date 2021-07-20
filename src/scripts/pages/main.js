import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from "../components/FormValidator.js";

import { initialCards } from "../utils/initial-сards.js";
import { 
  profileName,
  profileDescription,
  buttonEdit,
  buttonAdd,
  popupEdit,
  popupNew,
  formElementEdit,
  formElementNew,
  popupImage,
  nameInput,
  jobInput,
  photoList,
  validationConfig,
  keyClose
} from "../utils/constants.js";

import "../../pages/index.css";

const editFormValidator = new FormValidator(validationConfig, formElementEdit);
const cardFormValidator = new FormValidator(validationConfig, formElementNew);
const photoCardPopup = new PopupWithImage (popupImage, keyClose);
const user = new UserInfo (profileName, profileDescription);

//Включение валидации форм
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//Функция создания карточки
const createCard = (name, link) => {
  const card = new Card (name, link, '.photo-template', () => {
      photoCardPopup.open({name: name, link: link})
  } )
  const photo = card.generateCard();
  return photo;
};

//Функция добавления карточек на страницу
const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
      const name = item.name;
      const link = item.link;
      cardList.addItem(createCard(name, link))
  }
}, photoList);

cardList.render();

//Добавление НОВОЙ карточки на страницу
const addCardPopup = new PopupWithForm ({
  popupElement: popupNew,
  submitCallback: (item) => {
    const name = item.TitleProfile;
    const link = item.PhotoProfile;

    cardList.addItem(createCard(name ,link));

    addCardPopup.close();
  }
}, keyClose);


//Функция редактирования профиля пользователя
const editProfilePopup = new PopupWithForm ({
  popupElement: popupEdit,
  submitCallback: (data) => {
    const name = data.nameProfile;
    const job = data.jobProfile;

      user.setUserInfo(name, job);
      
      editProfilePopup.close();
  } 
}, keyClose);

//Открытие/заполнение и сбрасывание валидации Edit Popup
buttonEdit.addEventListener('click', () => {
  
  editProfilePopup.open()
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().job;
  editFormValidator.refreshInputValidity();
});

//Открытие и сбрасывание валидации New Popup
buttonAdd.addEventListener('click', () => {
  addCardPopup.open();
  cardFormValidator.refreshInputValidity();
});

// включение слушателей попапов
addCardPopup.setEventListeners();
photoCardPopup.setEventListeners();
editProfilePopup.setEventListeners();