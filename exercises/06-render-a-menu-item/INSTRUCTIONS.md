# Exercise 6: Render a menu item

Components hide the details of their logic, styling, and markup, while allowing customization via props. This allows them to simplify repeated patterns in UI with slightly different data. In this exercise, we will simplify the repeated menu item markup by creating a `MenuItem` component. 


- `src/menu-items.exercise.jsx`
- `src/menu.exercise.jsx`

1. In `src/menu.exercise.jsx`, copy everything between `{/* 👋 beginning of menu item */}` and `{/* 👋 end of menu item */}`.
2. In `src/menu-items.exercise.jsx`, paste that block inside `MenuItem` and return it.
3. Add the props `name`, `price` and `image` to `MenuItem`.
4. In the block you just pasted:
   - Replace the item name with `name`
   - Replace the image url with ``` `/images/${image.url}` ```
   - Replace the image alt with `image.alt`
   - Replace the price with `formatMoney(price)`
5. In `src/menu.exercise.jsx`, add an instance of `<MenuItem />` above the block you previously copied. Pass the data of the first menu item into `<MenuItem />`. 
   
   Keep in mind:

   - The `price` should be represented in cents (e.g. $1.00 is 100).
   - The `image` should look like `{alt: 'The alt of the image', url: 'base-image-url.jpg'}`.
   - The `name` can be passed unchanged.
6. Repeat step 5 for the remaining menu items, then delete the hard-coded instances when you're done.
