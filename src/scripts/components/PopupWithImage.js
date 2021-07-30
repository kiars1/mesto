import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor (popupElement, keyClose) {
    super(popupElement, keyClose);
    this._popupFigure = popupElement.querySelector('.popup__image');
    this._popupFigcaption = popupElement.querySelector('.popup__subtitle');
  }

  open(data) {
  super.open();

  

  this._popupFigure.src = data.link;
  this._popupFigure.alt = data.name;
  this._popupFigcaption.textContent = data.name;
  }
}