export class UserInfo {
  constructor(name, info) {
    this._name = name;
    this._info = info;
  }

  //Забиваем форму нужным значением
  getUserInfo() {
    const userInfo = {
    name: this._name.textContent,
    job: this._info.textContent
    }
    return userInfo;
  }

  //Кушаем инпуты
  setUserInfo(name, job) {
    this._name.textContent = name;
    this._info.textContent = job;
  }
}