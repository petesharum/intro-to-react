import express from 'express';

import menuData from './simple-menu.js';

const app = express();
app.use(express.json());
const port = 1415;

app.get('/items', async (req, res) => {
  await sleep(1000);

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

app.get('/items/:id', async (req, res) => {
  await sleep(1000);

  const item = menuData.items.find((item) => item.productId === req.params.id);

  if (item) {
    res.send(item);
  } else {
    res.status(404).send('Item not found');
  }
});

app.get('/categories', async (req, res) => {
  await sleep(1000);

  res.send(menuData.categories);
});

app.post('/order/line-items', async (req, res) => {
  await sleep(1000);

  const items = req.body;
  const something = items.map(({ productId, quantity }) => {
    const match = menuData.items.find((item) => item.productId === productId);
    return match ? { ...match, quantity } : undefined;
  });

  if (something.includes(undefined)) {
    res.status(404).send('Item not found');
  } else {
    const subtotal = something.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    // Fake tax calculation of 8.25%
    const tax = Math.round(subtotal * 0.0825);
    res.send({ subtotal, tax, total: subtotal + tax });
  }
});

app.post('/order', async (req, res) => {
  await sleep(1000);

  const { order, payment } = req.body;
  console.log('Order received:', { order, payment });
  res.send('Order placed');
  // simulate a failed order
  // res.status(500).send('Something went wrong');
});

app.listen(port, () => console.log(`*:${port} - Listening on port ${port}\n`));

// Simulate a delay in the server
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
