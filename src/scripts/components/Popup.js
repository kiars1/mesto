export class Popup {
  constructor (popupElement) {
    this._popupElement = popupElement;
  }

  //открытие popup
  open() {
    this._popupElement.classList.add('popup_opened');

    document.addEventListener('keydown', (evt) => {
        this._handleEscClose(evt);
    });
  }

  //Зыкрытие popup
  close() {
    this._popupElement.classList.remove('popup_opened');

    document.removeEventListener('keydown', (evt) => {
        this._handleEscClose(evt);
    });
  }

  //Закрытие popup на Esc
  _handleEscClose(evt) {
    if (evt.key == "Escape") {
        this.close()
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