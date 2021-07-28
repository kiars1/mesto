import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(data) {
  super.open();

  const popupFigure = this._popupElement.querySelector('.popup__image');
  const popupFigcaption = this._popupElement.querySelector('.popup__subtitle');

  popupFigure.src = data.link;
  popupFigure.alt = data.name;
  popupFigcaption.textContent = data.name;
  }
}