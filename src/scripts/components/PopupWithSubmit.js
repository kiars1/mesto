import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor (popupElement, submitHandler, keyClose) {
    super(popupElement);

    this._submitHandler = submitHandler;
    this._keyClose = keyClose;
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card);
      this.close();
    })
  } 

  open(card) {
    this._card = card;
    super.open();
  }
}