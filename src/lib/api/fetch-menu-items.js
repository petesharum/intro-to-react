async function fetchMenuItems(searchParams) {
  const url = new URL('/api/menu', window.location.origin);

  for (let entry of searchParams.entries()) {
    url.searchParams.append(...entry);
  }

  const response = await fetch(url);

  return response.json();
}

export { fetchMenuItems };
