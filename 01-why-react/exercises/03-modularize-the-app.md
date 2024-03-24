# Exercise 3: Modularize the app

It's helpful to break up your applications into smaller files, or modules. Modules make your code easier to understand by narrowing the scope of concern. Let's break up this app into smaller modules.

## Create a `Title` module

Inside this directory, create a new folder and call it `src`. This is where your modules will live.

Create a new file inside of `src`, `title.js`. Cut the `Title` function component from `index.html` and paste it in this new file. At the bottom of the page, add this line:

```js
export { Title };
```

This line allows other JavaScript files to import and execute this code.

## Create an `App` module

Again inside of `src`, create a new file and call it `app.js`. Create a new function component in this file called `App`, and just like `Title`, export this component at the bottom of the page:

```js
export { App };
```

Copy the element rendered in `index.html` (line 19) and paste inside the body of the `App` function, making sure to return it:

```js
function App() {
    return React.createElement(Title, null, 'Menu');
}
```

Since you're using `Title` in `createElement`, you will need to import it from `./title.js` at the top of the page:

```js
import { Title } from './title.js';
```

> 🚨 **Careful!**
> 
> Make sure to include the `.js` when importing JavaScript modules. The ECMAScript Module (ESM) specification requires a complete path, including the extension. The `./` refers to the directory the current file lives in (in this case, `src`).

Creating a top-level `App` component is a common practice in React. It serves as a place to add global functionality and configuration. Next we'll render this app component.

## Create the bootstrap module

Once more inside of `src`, create a new file and call it `main.js`. This will be the file that bootstraps our application. Cut our remaining JavaScript code out of `index.html`, starting with line 16, and paste it into `main.js`.

Import and render the `App` component from `./app.js` in place of what is currently in `React.createElement`.

Finally, in `index.html`, remove anything that's left between the `script` tags inside the `body`. In the opening script tag, add a `src` attribute and set it equal to `./src/main.js`.

To test this out, in your terminal, run `npm start`. This will start a local development server. Modules almost always require a server due to security policies in browsers. 
    
> ℹ️ **Good to know** 
> 
> We are using `npx` to run a dependency without having to add it to this project. You may be asked to install the `server` package. Go ahead and agree by entering `y` after the prompt. 

Navigate to the address shown after initialization (usually `localhost:3000`). You should see the same result from the last exercise.

🎉🎉 Congratulations! You've just created your first React app.