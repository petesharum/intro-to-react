# Exercise 6: Render a menu item

Components hide the details of their logic, styling, and markup, while allowing customization via props. This allows them to simplify repeated patterns in UI with slightly different data. In this exercise, we will simplify the repeated menu item markup by creating a `MenuItem` component. 


- `src/menu-items.jsx`
- `src/menu.jsx`

1. In `src/menu.jsx`, copy everything between `{/* 👇 beginning of menu item */}` and `{/* 👆 end of menu item */}`.
2. In `src/menu-items.jsx`, paste that block inside `MenuItem` and return it.
3. Add the props `name`, `price` and `image` to `MenuItem`.
4. In the block you just pasted, replace the hard-coded data with these props.
   1. Keep in mind `image` has `url` and `alt` properties.
   2. Also, you will need to add `/images/` to `image.url`.
   3. Finally, you will need to format `price` with `formatMoney` (`formatMoney(price)`).
5. In `src/menu.jsx`, add an instance of `<MenuItem />` above the block you previously copied. Pass the data of the first menu item into `<MenuItem />`. Keep in mind:
   1. The `price` should be represented in cents (e.g. $1.00 is 100).
   2. The `image` should look like `{alt: 'The alt of the image', url: 'base-image-url.jpg'}`.
   3. The `name` can be passed unchanged.
6. Repeat step 5 for the remaining menu items, then delete the hard-coded instances when you're done.
