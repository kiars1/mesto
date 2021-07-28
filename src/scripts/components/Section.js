export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  //Правило рендера
  render(data) {
    data.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  //Правило добавления
  addItem(element) {
    this._container.prepend(element);
  }
}