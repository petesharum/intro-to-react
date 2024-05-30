export default {
  categories: [
    {
      categoryId: '1',
      name: 'Burgers',
      description: 'Juicy burgers made with 100% beef',
      image: {
        url: 'burgers.jpg',
        alt: 'Juicy burgers made with 100% beef',
      },
    },
    {
      categoryId: '2',
      name: 'Chicken',
      description: 'Crispy chicken sandwiches and tenders',
      image: {
        url: 'chicken.jpg',
        alt: 'Crispy chicken sandwiches and tenders',
      },
    },
    {
      categoryId: '3',
      name: 'Sides',
      description: 'Delicious sides to complement your meal',
      image: {
        url: 'sides.jpg',
        alt: 'Delicious sides to complement your meal',
      },
    },
    {
      categoryId: '4',
      name: 'Beverages',
      description: 'Whatever you need to quench your thirst',
      image: {
        url: 'drinks.jpg',
        alt: 'Whatever you need to quench your thirst',
      },
    },
    {
      categoryId: '5',
      name: 'Desserts',
      description: 'Sweet treats to satisfy your cravings',
      image: {
        url: 'desserts.jpg',
        alt: 'Sweet treats to satisfy your cravings',
      },
    },
  ],
  items: [
    {
      productId: '1',
      categories: ['1'],
      name: 'Cheeseburger',
      description:
        'Classic beef patty with melted cheese, served on a toasted bun.',
      price: 599,
      image: {
        url: 'cheeseburger.jpeg',
        alt: 'Classic beef patty with melted cheese, served on a toasted bun.',
      },
    },
    {
      productId: '2',
      categories: ['1'],
      name: 'Bacon Cheeseburger',
      description: 'Our classic cheeseburger topped with crispy bacon strips.',
      price: 699,
      image: {
        url: 'bacon-cheeseburger.jpeg',
        alt: 'Our classic cheeseburger topped with crispy bacon strips.',
      },
    },
    {
      productId: '3',
      categories: ['1'],
      name: 'Double Cheeseburger',
      description:
        'Twice the beef, double the cheese, for those extra hungry moments.',
      price: 899,
      image: {
        url: 'double-cheeseburger.jpeg',
        alt: 'Twice the beef, double the cheese, for those extra hungry moments.',
      },
    },
    {
      productId: '4',
      categories: ['1'],
      name: 'Double Bacon Cheeseburger',
      description:
        'Our indulgent double cheeseburger topped with crispy bacon strips.',
      price: 999,
      image: {
        url: 'double-bacon-cheeseburger.jpeg',
        alt: 'Our indulgent double cheeseburger topped with crispy bacon strips.',
      },
    },
    {
      productId: '5',
      categories: ['2'],
      name: 'Chicken Sandwich',
      description:
        'Crispy fried chicken breast served on a toasted bun with lettuce and mayo.',
      price: 649,
      image: {
        url: 'chicken-sandwich.jpeg',
        alt: 'Crispy fried chicken breast served on a toasted bun with lettuce and mayo.',
      },
    },
    {
      productId: '6',
      categories: ['2'],
      name: 'Chicken Tenders',
      description:
        'Crispy, golden-brown chicken tenders served with your choice of dipping sauce.',
      price: 799,
      image: {
        url: 'chicken-tenders.jpeg',
        alt: 'Crispy, golden-brown chicken tenders served with your choice of dipping sauce.',
      },
    },
    {
      productId: '7',
      categories: ['3'],
      name: 'Fries',
      description: 'Crispy, golden fries seasoned to perfection.',
      price: 299,
      image: {
        url: 'fries.jpeg',
        alt: 'Crispy, golden fries seasoned to perfection.',
      },
    },
    {
      productId: '8',
      categories: ['3'],
      name: 'Onion Rings',
      description: 'Crispy, battered onion rings with a hint of sweetness.',
      price: 349,
      image: {
        url: 'onion-rings.jpeg',
        alt: 'Crispy, battered onion rings with a hint of sweetness.',
      },
    },
    {
      productId: '9',
      categories: ['5'],
      name: 'Frozen Custard',
      description:
        'Creamy, indulgent frozen custard available in various flavors.',
      price: 499,
      image: {
        url: 'frozen-custard.jpg',
        alt: 'Creamy, indulgent frozen custard available in various flavors.',
      },
    },
    {
      productId: '10',
      categories: ['5'],
      name: 'Chocolate Shake',
      description: 'Rich and creamy chocolate shake, a classic favorite.',
      price: 399,
      image: {
        url: 'chocolate-shake.jpg',
        alt: 'Rich and creamy chocolate shake, a classic favorite.',
      },
    },
    {
      productId: '11',
      categories: ['4'],
      name: 'Soda',
      description:
        'Refreshing soda available in a variety of flavors and sizes.',
      price: 199,
      image: {
        url: 'soda.jpg',
        alt: 'Refreshing soda available in a variety of flavors and sizes.',
      },
    },
  ],
};
