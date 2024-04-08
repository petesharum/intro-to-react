async function fetchProduct(id) {
  const response = await fetch(`/api/menu/${id}`);

  return response.json();
}

export { fetchProduct };
