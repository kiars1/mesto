import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
  constructor (popupElement, submitHandler, keyClose) {
    super(popupElement, keyClose);

    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card);
    })
  } 

  open(card) {
    this._card = card;
    super.open();
  }
}