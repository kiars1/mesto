export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  //Правило рендера
  render() {
    this._items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  //Правило добавления
  addItem(element) {
    this._container.prepend(element);
  }
}