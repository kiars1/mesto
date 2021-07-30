export class Popup {
  constructor (popupElement, keyClose) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._keyClose = keyClose;
    this._saveButtons = this._popupElement.querySelectorAll('.popup__button-save');
  }

  //открытие popup
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //Зыкрытие popup
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Закрытие popup на Esc
  _handleEscClose(evt) {
    if (evt.key == this._keyClose) {
        this.close()
    }
  }

  //Функция отображения загрузки
  renderLoading(loading, text) {
    if (loading) {
      this._saveButtons.forEach((submit) => {
        submit.classList.add('popup__button-save_active') //Просто css с простой анимацией. Люблю я это дело.
        submit.textContent = text;
      })
    } else {
      this._saveButtons.forEach((submit) => {
        submit.classList.remove('popup__button-save_active')
        submit.textContent = text;
        })
      }
    }

  //Закрытие popup кликом на пустую область/крестик
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__button-close') || (evt.target.classList.contains('popup'))) {
        this.close();
      }
    })
  }
}