export class Card {
  constructor(data, cardSelector, api, handleCardClick, handleDelete, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._cardSelector = cardSelector;
    this._api = api;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._userId = userId;
  }
  
  //Читаем template
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector('.photo__container')
    .cloneNode(true);
  
    return cardElement;
  }

  //Создаём карточку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector('.photo__image');
    const cardName = this._element.querySelector('.photo__title');
    const cardLike = this._element.querySelector('.photo__score');
    
    cardName.textContent = this._name;
    cardImage.alt = this._name;
    cardImage.src = this._link;
    cardImage.id = this._id;
    cardLike.textContent = this._likes.length;

    if (this._owner != this._userId) {
      this._element.querySelector('.photo__trash-button').style.display = 'none';
    }

    if (this._likes.find((like) => like._id === this._userId)) {
      this._element.querySelector('.photo__like-button').classList.add('photo__like-button_active');
    }

    return this._element;
  }
  
  //Ставим удаляем лайк
  _handleLikeClick() {
    const likeButton = this._element.querySelector('.photo__like-button');
    const score = this._element.querySelector('.photo__score');

    if (!likeButton.classList.contains('photo__like-button_active')) {
      this._api
        .putLike(this._id)
        .then((data) => {
          likeButton.classList.add('photo__like-button_active');
          score.textContent = `${data.likes.length}`;
        })
    } else {
      this._api
        .deleteLike(this._id)
        .then((data) => {
          likeButton.classList.remove('photo__like-button_active');
          score.textContent = `${data.likes.length}`;
        })
    }
  }
  
  //Удаляем Карточку
  deletePhoto() {
    this._element.remove();
    this._element = null;
  }
  
  //Добавляем слушателей
  _setEventListeners() {
    this._element.querySelector('.photo__image').addEventListener('click', () => {
      this._handleCardClick();
    });

    this._element.querySelector('.photo__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.photo__trash-button').addEventListener('click', () => {
      this._handleDelete(this);
    });
  }
}
