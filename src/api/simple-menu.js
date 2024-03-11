export default {
  categories: [
    {
      categoryID: '1',
      name: 'Pizza',
      description: 'Delicious pizza made with fresh ingredients',
      image: {
        url: 'pizza.jpg',
        altText: 'Delicious pizza made with fresh ingredients',
      },
    },
    {
      categoryID: '2',
      name: 'Burgers',
      description: 'Juicy burgers made with 100% beef',
      image: {
        url: 'burger.jpg',
        altText: 'Juicy burgers made with 100% beef',
      },
    },
    {
      categoryID: '3',
      name: 'Tacos',
      description: 'Spicy tacos made with authentic Mexican recipes',
      image: {
        url: 'tacos.jpg',
        altText: 'Spicy tacos made with authentic Mexican recipes',
      },
    },
    {
      categoryID: '4',
      name: 'Fried Chicken',
      description:
        'Crispy fried chicken made with secret spices and a side of your choice',
      image: {
        url: 'fried_chicken.jpg',
        altText:
          'Crispy fried chicken made with secret spices and a side of your choice',
      },
    },
    {
      categoryID: '5',
      name: 'Beverages',
      description: 'Refreshing beverages to quench your thirst',
      image: {
        url: 'beverages.jpg',
        altText: 'Refreshing beverages to quench your thirst',
      },
    },
  ],
  items: [
    {
      productID: '101',
      categories: ['1'],
      name: 'Pepperoni Pizza',
      description: 'Regular pizza with pepperoni and mozzarella',
      price: 9.99,
      quantityInStock: 20,
      customizableOptions: [
        {
          optionID: '1',
          name: 'Toppings',
          limit: 0,
          choices: [
            { name: 'Extra Cheese', price: 1.5 },
            { name: 'Extra Pepperoni', price: 2.0 },
          ],
        },
      ],
      image: {
        url: 'pepperoni_pizza.jpg',
        altText: 'Regular pizza with pepperoni and mozzarella',
      },
    },
    {
      productID: '102',
      categories: ['2'],
      name: 'Cheeseburger',
      description: 'Classic cheeseburger with lettuce, tomato, and pickles',
      price: 6.99,
      quantityInStock: 30,
      customizableOptions: [
        {
          optionID: '1',
          name: 'Toppings',
          limit: 0,
          choices: [
            { name: 'Bacon', price: 1.5 },
            { name: 'Onions', price: 0.75 },
            { name: 'Jalapeños', price: 1.0 },
          ],
        },
        {
          optionID: '2',
          name: 'Size',
          limit: 1,
          choices: [
            { name: 'Regular', price: 0.0 },
            { name: 'Large', price: 1.5 },
          ],
        },
      ],
      image: {
        url: 'cheeseburger.jpg',
        altText: 'Cheeseburger with lettuce, tomato, and pickles',
      },
    },
    {
      productID: '103',
      categories: ['3'],
      name: 'Cruncy Tacos',
      description: 'Cruncy beef tacos with salsa and guacamole',
      price: 8.5,
      quantityInStock: 25,
      customizableOptions: [
        {
          optionID: '1',
          name: 'Toppings',
          limit: 0,
          choices: [
            { name: 'Sour Cream', price: 1.0 },
            { name: 'Cilantro', price: 0.5 },
            { name: 'Lime', price: 0.25 },
          ],
        },
      ],
      image: {
        url: 'chicken_tacos.jpg',
        altText: 'Spicy chicken tacos with salsa and guacamole',
      },
    },
    {
      productID: '104',
      categories: ['4'],
      name: 'Fried Chicken',
      description: 'Crispy fried chicken with your choice of sides',
      price: 10.99,
      quantityInStock: 15,
      customizableOptions: [
        {
          optionID: '1',
          name: 'Sides',
          limit: 2,
          choices: [
            { name: 'Coleslaw', price: 2.0 },
            { name: 'Fries', price: 2.0 },
            { name: 'Mashed Potatoes', price: 2.5 },
            { name: 'Mac and Cheese', price: 3.0 },
          ],
        },
      ],
      image: {
        url: 'fried_chicken.jpg',
        altText: 'Crispy fried chicken with your choice of sides',
      },
    },
    {
      productID: '105',
      categories: ['5'],
      name: 'Soda',
      description: 'Refreshing carbonated beverage',
      price: 1.99,
      quantityInStock: 50,
      customizableOptions: [
        {
          optionID: '1',
          name: 'Flavor',
          limit: 1,
          choices: [
            { name: 'Cola', price: 0.0 },
            { name: 'Lemon-Lime', price: 0.0 },
            { name: 'Orange', price: 0.0 },
          ],
        },
        {
          optionID: '2',
          name: 'Size',
          limit: 1,
          choices: [
            { name: 'Small', price: 0.0 },
            { name: 'Medium', price: 0.5 },
            { name: 'Large', price: 1.0 },
          ],
        },
      ],
      image: {
        url: 'soda.jpg',
        altText: 'Refreshing soda in various flavors and sizes',
      },
    },
  ],
};
