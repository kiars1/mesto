const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

let buttonEdit = document.querySelector('.profile__button-edit');
let buttonAdd = document.querySelector('.profile__button-add');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupEdit = document.querySelector('.popup_type_edit');
let popupNew = document.querySelector('.popup_type_new-card');
let popupImage = document.querySelector('.popup_type_image');
let buttonCloseEdit = popupEdit.querySelector('.popup__button-close');
let buttonCloseNew = popupNew.querySelector('.popup__button-close');
let buttonCloseImage = popupImage.querySelector('.popup__button-close');
let formElementEdit = popupEdit.querySelector('.popup__form');
let formElementNew = popupNew.querySelector('.popup__form');
let popupFigure = popupImage.querySelector('.popup__image');
let popupFigcaption = popupImage.querySelector('.popup__subtitle');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');
let TitleInput = document.querySelector('#TitleInput');
let PhotoInput = document.querySelector('#PhotoInput');
const PhotoList = document.querySelector('.photo__list');
let LikeButton = document.querySelector('.photo__like-button');
const PhotoTemplate = document.querySelector('.photo-template').content;


function popupOpenEdit() {
  popupEdit.classList.add('popup_oppened');
  nameInput.value = `${profileName.textContent}`;
  jobInput.value = `${profileDescription.textContent}`;
}

function popupOpenNew() {
  popupNew.classList.add('popup_oppened');
}

function popupOpenImage() {
  popupImage.classList.add('popup_oppened');
}

function popupClose() {
  popupEdit.classList.remove('popup_oppened');
  popupNew.classList.remove('popup_oppened');
  popupImage.classList.remove('popup_oppened');
}


function formSubmitHandlerEdit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  popupClose()
}

function RenderItems() {
  initialCards.forEach(RenderItem);
}

function RenderItem({name, link}){
  const PhotoElement = PhotoTemplate.cloneNode(true);
  PhotoElement.querySelector('.photo__title').textContent = name;
  PhotoElement.querySelector('.photo__image').src = link;
  PhotoElement.querySelector('.photo__image').alt = name;

  PhotoElement.querySelector('.photo__image').addEventListener('click', function() {
  popupFigure.src = link;
  popupFigure.alt = name;
  popupFigcaption.textContent = name;
  popupOpenImage()
});

  DeletePhotoListeners(PhotoElement);
  LikePhotoListeners(PhotoElement);
  PhotoList.prepend(PhotoElement);
};

function formSubmitHandlerNew(evt){
  evt.preventDefault();
  let name = TitleInput.value;
	let link = PhotoInput.value;
 RenderItem({name, link});
 TitleInput.value = '';
 PhotoInput.value = '';
 popupClose()
}
formElementNew.addEventListener('submit', formSubmitHandlerNew);

function DeletePhoto (evt){
evt.target.closest('.photo__container').remove();
}
function DeletePhotoListeners(element) {
  element.querySelector('.photo__trash-button').addEventListener('click', DeletePhoto);
}


function LikePhoto (evt){
  evt.target.classList.toggle('photo__like-button_active');
}
function LikePhotoListeners(element) {
  element.querySelector('.photo__like-button').addEventListener('click', LikePhoto);
}

RenderItems()

buttonEdit.addEventListener('click', popupOpenEdit);
buttonAdd.addEventListener('click', popupOpenNew);
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
buttonCloseEdit.addEventListener('click', popupClose);
buttonCloseNew.addEventListener('click', popupClose);
buttonCloseImage.addEventListener('click', popupClose);





// PhotoElement.querySelector('.photo__like-button').addEventListener('click', function (evt) {
//      evt.target.classList.toggle('photo__like-button_active')
// }); 
//  PhotoElement.querySelector('.photo__trash-button').addEventListener('click', function (evt) {
//     evt.target.closest('.photo__container').remove();
// }); 