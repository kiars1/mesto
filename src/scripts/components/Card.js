export class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  
  //Читаем template
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector('.photo__container')
    .cloneNode(true);
  
    return cardElement;
  }
  
  //Добавляем/удаления ЛОЙСА
  _likePhoto() {
    this._element.querySelector('.photo__like-button').classList.toggle('photo__like-button_active');
  }
  
  //Удаляем Карточку
  _deletePhoto() {
    this._element.remove();
  }

  //Добавляем слушателей
  _setEventListeners() {
    this._element.querySelector('.photo__like-button').addEventListener('click', () => {
      this._likePhoto();
    });

    this._element.querySelector('.photo__trash-button').addEventListener('click', () => {
      this._deletePhoto();
    });

    this._element.querySelector('.photo__image').addEventListener('click', () => {
      this._handleCardClick();
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