function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getIngredients(NORMA_API) {
  return fetch(`${NORMA_API}/ingredients`)
    .then(checkResponse)
}

export function postOrder(NORMA_API, ingredients) {
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
