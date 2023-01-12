import {
  NORMA_API
} from './const'
import {
  getCookie,
  setCookie
} from './util';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

export function getIngredients() {
  return fetch(`${NORMA_API}/ingredients`)
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

export function getUserData() {
  return fetchWithRefresh(`${NORMA_API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
  })
}

export function patchUserData(form) {
  return fetchWithRefresh(`${NORMA_API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(form)
  })
}

export function postRegisterUser(form) {
  return fetch(`${NORMA_API}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form)
  })
}

export function logoutUser(refreshToken) {
  return fetch(`${NORMA_API}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refreshToken)
    })
    .then(checkResponse)
}

export function postLogin(form) {
  return fetch(`${NORMA_API}/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify(form)
    })
    .then(checkResponse)
}

export function postToken(token) {
  return fetch(`${NORMA_API}/auth/token`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token)
    })
    .then(checkResponse)
}

export function postEmail(form) {
  return fetch(`${NORMA_API}/password-reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
    .then(checkResponse)
}

export function postPassword(form) {
  return fetch(`${NORMA_API}/password-reset/reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
    .then(checkResponse)
}

async function fetchWithRefresh(url, options) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (e) {
    const error = await e.json();
    if (error.message === 'jwt expired') {
      const refreshData = await postToken({
        token: getCookie("refreshToken")
      });

      setCookie('accessToken', refreshData.accessToken.split('Bearer ')[1]);
      setCookie('refreshToken', refreshData.refreshToken);
      setCookie('time', Date.now() + (19 * 60 * 1000))

      options.headers.Authorization = refreshData.accessToken;
    }
    const res = await fetch(url, options);
    return await checkResponse(res);
  }
}
