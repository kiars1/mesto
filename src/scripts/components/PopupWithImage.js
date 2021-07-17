import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open({name, link}) {
  super.open();

  const popupFigure = this._popupElement.querySelector('.popup__image');
  const popupFigcaption = this._popupElement.querySelector('.popup__subtitle');

  popupFigure.src = link;
  popupFigure.alt = name;
  popupFigcaption.textContent = name;
  }
}