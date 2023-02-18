import { NORMA_API } from "./const";
import { getCookie, setCookie } from "./util";

function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

function request(url: string, options?: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

export function getIngredients() {
  return request(`${NORMA_API}/ingredients`);
}

export function postOrder(ingredients: Array<string | undefined>) {
  return request(`${NORMA_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
}

export function getUserData() {
  return fetchWithRefresh(`${NORMA_API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });
}

export function patchUserData(form: { email: string; name: string }) {
  return fetchWithRefresh(`${NORMA_API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(form),
  });
}

export function postRegisterUser(form: {
  name: string;
  email: string;
  password: string;
}) {
  return request(`${NORMA_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
}

export function logoutUser(refreshToken: { token: string | undefined }) {
  return request(`${NORMA_API}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(refreshToken),
  });
}

export function postLogin(form: { email: string; password: string }) {
  return request(`${NORMA_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(form),
  });
}

export function postToken(token: { token: string | undefined }) {
  return request(`${NORMA_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  });
}

export function postEmail(form: { email: string }) {
  return request(`${NORMA_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
}

export function postPassword(form: { password: string; token: string }) {
  return request(`${NORMA_API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
}

async function fetchWithRefresh(url: string, options: any) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (e: any) {
    const error = await e.json();
    if (error.message === "jwt expired") {
      const refreshData = await postToken({
        token: getCookie("refreshToken"),
      });

      setCookie("accessToken", refreshData.accessToken.split("Bearer ")[1]);
      setCookie("refreshToken", refreshData.refreshToken);
      setCookie("time", Date.now() + 19 * 60 * 1000);

      options.headers.Authorization = refreshData.accessToken;

      const res = await fetch(url, options);
      return await checkResponse(res);
    }
  }
}
