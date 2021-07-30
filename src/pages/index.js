import { Api } from '../scripts/components/Api.js';
import { Card } from '../scripts/components/Card.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithSubmit } from "../scripts/components/PopupWithSubmit.js";
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { FormValidator } from "../scripts/components/FormValidator.js";

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
} from "../scripts/utils/constants.js";

import "./index.css";

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

//Это мой боевой друг. Отличная заглушка, чтобы не компосировать мозги.
//Он потом станет немного другим, как и все мы с возростом,
//но сейчас он такой какой он есть.
let UserId = null;

//Функция создания карточки
const createCard = (data, UserId, cardList) => {
  const card = new Card (data, '.photo-template', api, () => {
    photoCardPopup.open(data);
  }, () => {
  deleteConfirm.open(card);
}, UserId);
  const photo = card.generateCard();
  cardList.addItem(photo)
};

//Функция добавления карточек на страницу
const cardList = new Section ({
  renderer: (item) => {
      createCard(item, UserId, cardList)
  }
}, photoList);

//Функция редактирования АВАТАРА пользователя
const editAvatarPopup = new PopupWithForm ({
  popupElement: popupAvatar,
  submitCallback: (data) => {
    editAvatarPopup.renderLoading(true, `Сохранение...`);
    const avatar = data.AvatarProfile;

    api.pushUserAvatar({avatar})
      .then((data) => {
      user.setUserAvatar(data.avatar);
      editAvatarPopup.close();
      })
      .catch(() => {
        alert('Невозможно обновить аватар пользователя.'); //Потому что ошубку надо видеть. Да я понимаю что лучше чтобы это был отдельный popup
      })
      .finally(() => {
        editAvatarPopup.renderLoading(false, `Сохранить`);
  })
  } 
}, keyClose);

//Функция редактирования профиля пользователя
const editProfilePopup = new PopupWithForm ({
  popupElement: popupEdit,
  submitCallback: (data) => {
    editProfilePopup.renderLoading(true, `Сохранение...`);
    const name = data.nameProfile;
    const job = data.jobProfile;

    api.pushUserInfo({name, job})
    .then((data) => {
      const name = data.name
      const job = data.about
      user.setUserInfo(name, job);
      editProfilePopup.close();
    })
    .catch(() => {
      alert('Невозможно обновить данные пользователя.') //Потому что ошубку надо видеть. Да я понимаю что лучше чтобы это был отдельный popup
    })
    .finally(() => {
      editProfilePopup.renderLoading(false, `Сохранить`);
    })
  }
}, keyClose);

//Добавление НОВОЙ карточки на страницу
const addCardPopup = new PopupWithForm ({
  popupElement: popupNew,
  submitCallback: (item) => {
    addCardPopup.renderLoading(true, `Сохранение...`);
    const name = item.TitleProfile;
    const link = item.PhotoProfile;

    api.pushCards({name, link})
      .then((data) => {
        createCard(data, UserId, cardList);
        addCardPopup.close();
      })
      .catch(() => {
        alert('Невозможно добавить новую карточку.');  //Потому что ошубку надо видеть. Да я понимаю что лучше чтобы это был отдельный popup
      })
      .finally(() => {
        addCardPopup.renderLoading(false, `Создать`);
      })
  }
}, keyClose);

//Функция подтверждения удаления
const deleteConfirm = new PopupWithSubmit (popupDelete, 
  (card) => {
  deleteConfirm.renderLoading(true, `Сохранение...`);
  const id = card._id
  
  api.deleteCards(id)
    .then((res) => {
      if (res.message = "Пост удалён") {  //Да да это тоже костыль, чтобы сделать хоть какуюто проверку ответа сервера. Чегото тут я уже спёкся.
      card.deletePhoto();
      deleteConfirm.close();
      }
    })
    .catch(() => {
      alert('Невозможно удалить карточку.'); //Потому что ошубку надо видеть
    })
    .finally(() => {
      deleteConfirm.renderLoading(false, `Да`);
    })
  }, keyClose)

//Открытие и сбрасывание валидации попапа Обновления Аватара
buttonAvatar.addEventListener('click', () => {
  editAvatarPopup.open();
  avatarFormValidator.refreshInputValidity();
});

//Открытие/заполнение и сбрасывание валидации попапа Редактирования профиля
buttonEdit.addEventListener('click', () => {
  editProfilePopup.open()
  nameInput.value = user.getUserInfo().name;
  jobInput.value = user.getUserInfo().job;
  editFormValidator.refreshInputValidity();
});

//Открытие и сбрасывание валидации попапа Создания карточки
buttonAdd.addEventListener('click', () => {
  addCardPopup.open();
  cardFormValidator.refreshInputValidity();
});


//Включение слушателей попапов
editAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
photoCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
deleteConfirm.setEventListeners();


//А этот друг жрёт как не в себя. Мы не будем его за это осуждать
//Ведь он ещё и отправляет письма на сервер.
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
    const name = userData.name
    const job = userData.about
    const avatar = userData.avatar
    user.setUserInfo(name, job);
    user.setUserAvatar(avatar);
    UserId = userData._id; //А это уже позрослевший друг.

    cardList.render(cards);
  })
  .catch((err) => {
    console.log(err);
  })