import express from 'express';

import menuData from './simple-menu.js';

const app = express();
const port = 1415;

app.get('/items', (req, res) => {
  const category = req.query.category;
  let items = menuData.items;

  if (category) {
    items = menuData.items.filter((item) => item.categories.includes(category));
  }

  const q = req.query.q;

  if (q?.trim()) {
    items = items.filter((item) =>
      item.name.toLowerCase().includes(q.trim().toLowerCase()),
    );
  }

  res.send(items);
});

app.get('/items/:id', (req, res) => {
  const item = menuData.items.find((item) => item.productID === req.params.id);

  if (item) {
    res.send(item);
  } else {
    res.status(404).send('Item not found');
  }
});

app.get('/categories', (req, res) => {
  res.send(menuData.categories);
});

app.listen(port, () => console.log(`*:${port} - Listening on port ${port}\n`));
