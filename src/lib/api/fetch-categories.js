async function fetchCategories() {
  const response = await fetch('/api/menu/categories');

  return response.json();
}

export { fetchCategories };
