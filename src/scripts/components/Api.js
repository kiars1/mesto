export class Api {
  constructor({baseUrl, headers}) {
  this._baseUrl = baseUrl; 
  this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) { 
      return res.json();
    } return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получаем профиль пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) =>  this._checkResponse(res))
  }

  //Отправляем имя и хобби
  pushUserInfo(item) {
      return fetch(`${this._baseUrl}users/me/`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              name: item.name,
              about: item.job
            })
          })
      .then((res) =>  this._checkResponse(res))
  }

  //Отправляем Аватар
  pushUserAvatar(link) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(link)
      })
  .then((res) =>  this._checkResponse(res))
}

  //Получаем карточки с сервака
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) =>  this._checkResponse(res))
  }

  //Отправляем карточку
  pushCards(item) {
      return fetch(`${this._baseUrl}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: item.name,
          link: item.link
        })
        })
    .then((res) =>  this._checkResponse(res))
  }

  //Удаляем карточку
  deleteCards(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      })
  .then((res) =>  this._checkResponse(res))
  }

  //Ставим лайк
  putLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
      })
  .then((res) =>  this._checkResponse(res))
  }

  //Удаляем лайк
  deleteLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      })
  .then((res) =>  this._checkResponse(res))
  }
}
