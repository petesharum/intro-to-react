# Exercise 2: Create a component

Currently our app is rendering a simple `h1` element. React's strength is in its ability to group these elements, along with style and behavior, into components. If elements like `h1` are atoms, components can be thought of as molecules, and even sometimes complex organisms.

There are two ways of creating components in React: function components and class components. We will focus on function components, which are simply functions that contain rendering instructions. Let's move our `h1` render into a new function component.

> ℹ️ **Good to know**
> 
> For this exercise, you can drag the `index.html` file into a browser to render the result.

## Create the initial component

Inside the `script` tags we added to `index.html`, create a function called `Title` _underneath_ the `root.render`:

```js
function Title() {
    // TODO
}
```

> 🚨 **Careful!**
> 
> Function components, and React components in general, must be captialized when rendered. The capitalization tells React to render this as a custom component and not as a native browser element (e.g. `Title` vs. `<title>`).

Inside the `Title` component function, return a new `React.createElement`. We'll render an `h1` like the current `root.render`:

```js
function Title() {
    return React.createElement('h1');
}
```

## Pass the component

Now that we have a `Title` component, let's replace the `h1` in the `root.render` with it. Note that we've updated the text we're rendering as well:

```js
root.render(React.createElement(Title, null, 'Menu'));
```

If you are viewing your app in a browser, refresh the page. Do you see anything? If you were to inspect the HTML, you would see the `h1` element is rendered, but there's nothing in it. That's because we're not passing props to the `Title` component.

## Forward props

One of the ways React components receive data is through `props`, an object that can contain any type of JavaScript value, including other objects and even functions. Props are passed to the rendered component as the second argument of `React.createElement`. This is what the `null` represents in the current rendered `h1`.

The last argument of `React.createElement` is a special prop called `children`. React `children` are zero or more React elements that are rendered as nested elements of the rendered component. You can pass an array of React elements, a single React element, or several React elements as `children`.

```js
/*****************************************
 * These are examples, not exercise code *
 *****************************************/

// children as a single element
React.createElement('h1', null, React.createElement('span', null, 'Hi!'));

// children as an array
React.createElement('h1', null, [
    React.createElement('span', null, 'I am a nested span'),
    'I am a text node',
]);

// children as multiple arguments
React.createElement(
    'h1',
    null,
    React.createElement('span', null, 'I am a nested span'),
    'I am a text node',
    // ...
);
```

In order to access `props`, including `children`, we need to pass the props to the `React.createElement` in `Title`.

In the function component `Title`, add an arugment and call it `props`. Add `props` as the second argument to the returned `React.createElement`:

```js
function Title(props) {
    return React.createElement('h1', props);
}
```

`children` exists as a key in `props`, so the above function is the equivalent of:

```js
function Title({children, ...props}) {
    return React.createElement('h1', props, children);
}
```

Refresh your page now. You should now see the `Menu` title rendered as an `h1`.

> 💰 **Bonus** 
> 
> Play around with what you pass as the `props` parameter. See what happens when you pass a `style` prop with a value of `{color: 'red'}`.

Components encapsulate complexity while the `props` and `children` parameters allow for flexibility and composability, making React components quite powerful.
