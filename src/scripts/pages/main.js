import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from "../components/FormValidator.js";

import { 
  profileImage,
  profileName,
  profileDescription,
  buttonAvatar,
  buttonEdit,
  buttonAdd,
  popupAvatar,
  popupEdit,
  popupNew,
  popupDelete,
  formElementAvatar,
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/',
  headers: {
    authorization: '1dde9be2-497c-4a76-871d-3a40c54053fd',
    'Content-Type': 'application/json'
  }
});

const avatarFormValidator = new FormValidator(validationConfig, formElementAvatar);
const editFormValidator = new FormValidator(validationConfig, formElementEdit);
const cardFormValidator = new FormValidator(validationConfig, formElementNew);
const photoCardPopup = new PopupWithImage (popupImage, keyClose);
const user = new UserInfo (profileName, profileDescription, profileImage);

//Включение валидации форм
avatarFormValidator.enableValidation()
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//Получаем данные пользователя
api.getUserInfo()
.then((res) => {
  const name = res.name;
  const about = res.about;
  const avatar = res.avatar;

  user.setUserInfo(name, about);
  user.setUserAvatar(avatar);
})


//Функция создания карточки
const createCard = (name, link, id, likes) => {
  const card = new Card (name, link, id, likes, '.photo-template', () => {
      photoCardPopup.open({name: name, link: link});
  }, () => {
  deleteConfirm.open(card);
});

  const photo = card.generateCard();
  return photo;
};

let cardsArray = [];
let cardList = null;

//Получаем карточки
api.getInitialCards()
.then((res) => {
  cardsArray = res.map((item) => {
      return item;
  })
  return cardsArray
})

//Функция добавления карточек на страницу
.then(() => {
cardList = new Section ({
  items: cardsArray,
  renderer: (item) => {
      const name = item.name;
      const link = item.link;
      const id = item._id;
      const likes = item.likes.length
      cardList.addItem(createCard(name, link, id, likes))
  }
}, photoList);

cardList.render();

})

//Добавление НОВОЙ карточки на страницу
const addCardPopup = new PopupWithForm ({
  popupElement: popupNew,
  submitCallback: (item) => {
    const name = item.TitleProfile;
    const link = item.PhotoProfile;

    api.pushCards({name, link});
    cardList.addItem(createCard(name ,link)); // менять 

    addCardPopup.close();
  }
}, keyClose);

//Функция редактирования профиля пользователя
const editProfilePopup = new PopupWithForm ({
  popupElement: popupEdit,
  submitCallback: (data) => {
    const name = data.nameProfile;
    const job = data.jobProfile;

      api.pushUserInfo({name, job})
      user.setUserInfo(name, job); // менять 
      
      editProfilePopup.close();
  }
}, keyClose);

//Функция редактирования АВАТАРА пользователя
const editAvatarPopup = new PopupWithForm ({
  popupElement: popupAvatar,
  submitCallback: (data) => {
    const avatar = data.AvatarProfile;

    api.pushUserAvatar({avatar});
    user.setUserAvatar(avatar);
      
      editAvatarPopup.close();
  } 
}, keyClose);

//Функция подтверждения удаления
const deleteConfirm = new PopupWithSubmit (popupDelete, 
  (card) => {
  const id = card._id

  api.deleteCards(id)
  card.deletePhoto();// менять 
  deleteConfirm.close();
  }, keyClose)

//Открытие и сбрасывание валидации AVATAR
buttonAvatar.addEventListener('click', () => {
  editAvatarPopup.open();
  avatarFormValidator.refreshInputValidity();
});

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
editAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
photoCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
deleteConfirm.setEventListeners();