export class UserInfo {
  constructor(name, info, avatar) {
    this._name = name;
    this._info = info;
    this._avatar = avatar;
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

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}