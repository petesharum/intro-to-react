export default {
  categories: [
    {
      categoryId: '1',
      name: 'Pizza',
      description: 'Delicious pizza made with fresh ingredients',
      image: {
        url: 'pizza.jpg',
        alt: 'Delicious pizza made with fresh ingredients',
      },
    },
    {
      categoryId: '2',
      name: 'Burgers',
      description: 'Juicy burgers made with 100% beef',
      image: {
        url: 'burger.jpg',
        alt: 'Juicy burgers made with 100% beef',
      },
    },
    {
      categoryId: '3',
      name: 'Tacos',
      description: 'Spicy tacos made with authentic Mexican recipes',
      image: {
        url: 'tacos.jpg',
        alt: 'Spicy tacos made with authentic Mexican recipes',
      },
    },
    {
      categoryId: '4',
      name: 'Fried Chicken',
      description:
        'Crispy fried chicken made with secret spices and a side of your choice',
      image: {
        url: 'fried_chicken.jpg',
        alt: 'Crispy fried chicken made with secret spices and a side of your choice',
      },
    },
    {
      categoryId: '5',
      name: 'Beverages',
      description: 'Refreshing beverages to quench your thirst',
      image: {
        url: 'beverages.jpg',
        alt: 'Refreshing beverages to quench your thirst',
      },
    },
  ],
  items: [
    {
      productId: '101',
      categories: ['1'],
      name: 'Pepperoni Pizza',
      description: 'Regular pizza with pepperoni and mozzarella',
      price: 999,
      quantityInStock: 20,
      customizableOptions: [
        {
          optionId: '1',
          name: 'Toppings',
          limit: 0,
          choices: [
            { name: 'Extra Cheese', price: 150 },
            { name: 'Extra Pepperoni', price: 200 },
          ],
        },
      ],
      image: {
        url: 'pepperoni-pizza.jpeg',
        alt: 'Regular pizza with pepperoni and mozzarella',
      },
    },
    {
      productId: '102',
      categories: ['2'],
      name: 'Cheeseburger',
      description: 'Classic cheeseburger with lettuce, tomato, and pickles',
      price: 699,
      quantityInStock: 30,
      customizableOptions: [
        {
          optionId: '1',
          name: 'Toppings',
          limit: 0,
          choices: [
            { name: 'Bacon', price: 150 },
            { name: 'Onions', price: 75 },
            { name: 'Jalapeños', price: 100 },
          ],
        },
        {
          optionId: '2',
          name: 'Extras',
          limit: 1,
          choices: [
            { name: 'Regular', price: 0 },
            { name: 'Double Meat', price: 150 },
          ],
        },
      ],
      image: {
        url: 'cheeseburger.jpeg',
        alt: 'Cheeseburger with lettuce, tomato, and pickles',
      },
    },
    {
      productId: '103',
      categories: ['3'],
      name: 'Cruncy Tacos',
      description: 'Cruncy beef tacos with salsa and guacamole',
      price: 850,
      quantityInStock: 25,
      customizableOptions: [
        {
          optionId: '1',
          name: 'Toppings',
          limit: 0,
          choices: [
            { name: 'Sour Cream', price: 100 },
            { name: 'Cilantro', price: 50 },
            { name: 'Lime', price: 25 },
          ],
        },
      ],
      image: {
        url: 'tacos-two.jpeg',
        alt: 'Spicy chicken tacos with salsa and guacamole',
      },
    },
    {
      productId: '104',
      categories: ['4'],
      name: 'Fried Chicken',
      description: 'Crispy fried chicken with your choice of sides',
      price: 1099,
      quantityInStock: 15,
      customizableOptions: [
        {
          optionId: '1',
          name: 'Sides',
          limit: 2,
          choices: [
            { name: 'Coleslaw', price: 200 },
            { name: 'Fries', price: 200 },
            { name: 'Mashed Potatoes', price: 250 },
            { name: 'Mac and Cheese', price: 300 },
          ],
        },
      ],
      image: {
        url: 'fried-chicken.jpeg',
        alt: 'Crispy fried chicken with your choice of sides',
      },
    },
    {
      productId: '105',
      categories: ['5'],
      name: 'Soda',
      description: 'Refreshing carbonated beverage',
      price: 199,
      quantityInStock: 50,
      customizableOptions: [
        {
          optionId: '1',
          name: 'Flavor',
          limit: 1,
          choices: [
            { name: 'Cola', price: 0 },
            { name: 'Lemon-Lime', price: 0 },
            { name: 'Orange', price: 0 },
          ],
        },
        {
          optionId: '2',
          name: 'Size',
          limit: 1,
          choices: [
            { name: 'Small', price: 0 },
            { name: 'Medium', price: 50 },
            { name: 'Large', price: 100 },
          ],
        },
      ],
      image: {
        url: 'soda.jpeg',
        alt: 'Refreshing soda in various flavors and sizes',
      },
    },
  ],
};
