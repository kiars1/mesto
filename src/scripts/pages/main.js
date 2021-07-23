import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithSubmit } from "../components/PopupWithSubmit.js";
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from "../components/FormValidator.js";

import { initialCards } from "../utils/initial-сards.js";
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

//Тест для понимания что там внутри
 const ES = fetch(`https://mesto.nomoreparties.co/v1/cohort-26/cards`, {
    headers: {
      authorization: '1dde9be2-497c-4a76-871d-3a40c54053fd',
      'Content-Type': 'application/json'
  }
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    
    data.map((card) => {

    });
})


// const Api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/',
//   headers: {
//     authorization: '1dde9be2-497c-4a76-871d-3a40c54053fd',
//     'Content-Type': 'application/json'
//   }
// });

const avatarFormValidator = new FormValidator(validationConfig, formElementAvatar);
const editFormValidator = new FormValidator(validationConfig, formElementEdit);
const cardFormValidator = new FormValidator(validationConfig, formElementNew);
const photoCardPopup = new PopupWithImage (popupImage, keyClose);
const user = new UserInfo (profileName, profileDescription, profileImage);

//Включение валидации форм
avatarFormValidator.enableValidation()
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//Функция создания карточки
const createCard = (name, link) => {
  const card = new Card (name, link, '.photo-template', () => {
      photoCardPopup.open({name: name, link: link});
  }, (card) => {
  deleteConfirm.open(card);
});

  const photo = card.generateCard();
  return photo;
};

 //Функция подтверждения удаления
 const deleteConfirm = new PopupWithSubmit (popupDelete, 
  (card) => {
  card.deletePhoto();
  deleteConfirm.close();
  }, keyClose)

deleteConfirm.setEventListeners();

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

//Функция редактирования АВАТАРА пользователя
const editAvatarPopup = new PopupWithForm ({
  popupElement: popupAvatar,
  submitCallback: (item) => {
    const avatar = item.AvatarProfile;
    user.setUserAvatar(avatar);
      
      editAvatarPopup.close();
  } 
}, keyClose);



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