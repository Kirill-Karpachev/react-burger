export function getIngredients(NORMA_API) {
  return fetch(`${NORMA_API}/ingredients`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
}
