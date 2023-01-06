import {
  NORMA_API
} from './const'
import {
  getCookie
} from './util';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getIngredients() {
  return fetch(`${NORMA_API}/ingredients`)
    .then(checkResponse)
}

export function getUserData() {
  return fetch(`${NORMA_API}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
    })
    .then(checkResponse)
}

export function logoutUser(refreshToken) {
  return fetch(`${NORMA_API}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken
      })
    })
    .then(checkResponse)
}

export function postOrder(ingredients) {
  return fetch(`${NORMA_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "ingredients": ingredients
      }),
    })
    .then(checkResponse)
}

export function registerUser() {
  return fetch(`${NORMA_API}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": "testKirill@yandex.ru",
      "password": "password",
      "name": "Kirill"
    })
  })
}

export function postLogin(email, password) {
  return fetch(`${NORMA_API}/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(checkResponse)
}
