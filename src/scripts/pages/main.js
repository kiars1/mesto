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
  saveButton,
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

let UserId = null;

//Функция подтверждения удаления
const deleteConfirm = new PopupWithSubmit (popupDelete, 
  (card) => {
  api.deleteCards(card._id)
    .then(() => {
      card.deletePhoto();
      deleteConfirm.close();
    })
  }, keyClose)

function loading(Loading) {
  if (Loading) {
    Array.from(saveButton).forEach((submit) => {
      submit.classList.add('popup__button-save_active')
      submit.textContent = "Сохранение...";
    })
  } else {
    Array.from(saveButton).forEach((submit) => {
      submit.classList.remove('popup__button-save_active')
      submit.textContent = "Сохранить";
    })
  }
}

//Функция создания карточки
const createCard = (data, UserId, cardList) => {
  const card = new Card (data, '.photo-template', api, () => {
    photoCardPopup.open(data);
  }, () => {
  deleteConfirm.open(card);
}, UserId);
  // card.likePhoto(data);
  const photo = card.generateCard();
  cardList.addItem(photo)
};

//Функция добавления карточек на страницу
const cardList = new Section ({
  renderer: (item) => {
      createCard(item, UserId, cardList)
  }
}, photoList);

//Добавление НОВОЙ карточки на страницу
const addCardPopup = new PopupWithForm ({
  popupElement: popupNew,
  submitCallback: (item) => {
    loading(true);
    const name = item.TitleProfile;
    const link = item.PhotoProfile;

    api.pushCards({name, link})
      .then((data) => {
      createCard(data, UserId, cardList);
      addCardPopup.close();
    })
    .finally(() => {
      loading(false);
  })
  }
}, keyClose);

//Функция редактирования профиля пользователя
const editProfilePopup = new PopupWithForm ({
  popupElement: popupEdit,
  submitCallback: (data) => {
    loading(true);
    const name = data.nameProfile;
    const job = data.jobProfile;

      api.pushUserInfo({name, job})
      .then((data) => {
        const name = data.name
        const job = data.about
        user.setUserInfo(name, job);
        editProfilePopup.close();
      })
      .finally(() => {
        loading(false);
    })
  }
}, keyClose);

//Функция редактирования АВАТАРА пользователя
const editAvatarPopup = new PopupWithForm ({
  popupElement: popupAvatar,
  submitCallback: (data) => {
    loading(true);
    const avatar = data.AvatarProfile;

    api.pushUserAvatar({avatar})
      .then((data) => {
      user.setUserAvatar(data.avatar);
      editAvatarPopup.close();
    })
    .finally(() => {
      loading(false);
  })
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
deleteConfirm.setEventListeners();

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, userData]) => {
        const name = userData.name
        const job = userData.about
        const avatar = userData.avatar
        user.setUserInfo(name, job);
        user.setUserAvatar(avatar);
        UserId = userData._id;

        cardList.render(cards);
    })