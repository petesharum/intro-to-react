# Exercise 13: Fetch Menu Items

Development of our restaurant website has been going well so far, but we still have one glaring gap: we've been working with local data. Luckily for us, our backend team has recently completed the restaurant menu API.

Let's celebrate by consuming this API in our `Menu` component (hooray).

- [api/server.js](./api/server.js)
- [src/menu.exercise.jsx](./src/menu.exercise.jsx)

1. First, examine [api/server.js](./api/server.js).

    This file is where the API is defined. The API is a simple Express server with a handful of endpoints. You can refer to this file for API information going forward.

2. In [src/menu.exercise.jsx](./src/menu.exercise.jsx), convert `items` to component state with `useState`. Initialize it to `[]`.
3. Using `useEffect`, send a request to `GET /api/menu` to retrieve the menu items. Make sure to pass the `window.location.search` along with the API URL:

    ```javascript
    const apiUrl = `/api/menu${window.location.search}`;
    ```

    Since we're getting back JSON from the API, you will need to call the response's `json` method:

    ```javascript
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // do stuff with the data here...
      });
    ```

    Finally, don't forget to pass the dependency array to the `useEffect`, or else you'll have an infinite rendering loop on your hands.

4. Once you're getting data back from the API, set the `items` state with the returned data.

At this point, you should be able to see the entire menu. We can't test the category filters out just yet, but you can try a search to make sure the search params are being passed properly.

If you had trouble with this exercise, don't worry. You'll get more practice in the next one, when we fetch the categories.