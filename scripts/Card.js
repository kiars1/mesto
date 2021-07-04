import {openPopup, popupImage, popupFigure, popupFigcaption} from './index.js';

export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }
  
  //Читаем template
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector('.photo__container')
    .cloneNode(true);
  
    return cardElement;
  }
  
  //Репресируем Карточку
  _likePhoto() {
    this._element.querySelector('.photo__like-button').classList.toggle('photo__like-button_active');
  }
  
  //Добавляем/удаления ЛОЙСА
  _deletePhoto() {
    this._element.querySelector('.photo__trash-button').closest('.photo__container').remove();
  }

  //Вызываем картинку на допрос
  _openPhotoPopup() {
    popupFigure.src = this._link;
    popupFigure.alt = this._name;
    popupFigcaption.textContent = this._name;
    openPopup(popupImage);
  }

  //Соседи из соседней кухни которые позвонят в НКВД.
  _setEventListeners() {
    this._element.querySelector('.photo__like-button').addEventListener('click', () => {
      this._likePhoto();
    });

    this._element.querySelector('.photo__trash-button').addEventListener('click', () => {
      this._deletePhoto();
    });

    this._element.querySelector('.photo__image').addEventListener('click', () => {
      this._openPhotoPopup();
    });
  }

  //Создаём карточку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.photo__image');
    const cardName = this._element.querySelector('.photo__title');

    cardName.textContent = this._name;
    cardImage.alt = this._name;
    cardImage.src = this._link;

    return this._element;
  }
}