# Exercise 8: Conditionally Render a Message

Now that we're successfully rendering a list of menu items, we need to handle the edge case of no items. We'll do that with conditional rendering.

- `src/menu.jsx`

1. In `src/menu.jsx`, locate the `<MenuItems />`.
2. Inside this component, return `<MenuItemsNoResults />` if `items.length` is `0`.
3. Otherwise, return the mapped menu items.