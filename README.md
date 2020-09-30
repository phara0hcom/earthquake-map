# Tamer Elsayed

### install

`npm install` or `yarn install`

### ./src/keys.ts

Hopefully I've included a Gist link in my email, please put the Gist file in the `./src/` folder with the name `keys.ts`

### start

`npm start` or `yarn start`

## Improvements

- Cache calls via back-end API and or in the front-end
- Figure out what part of the map is in view and call only that part by adding `minlatitude`, `minlongitude`, `maxlatitude` and `maxlongitude` to the call.
  - Then I can make the date range larger and target an area.
- Improve the date validation, I have not tested it fully and I suspect there are some issues with it.
- There could be improvements to be had in changing the map library but I would have to do a lot of testing to find that out.

## Things I learned

I wanted to try and make this without Redux and do everything in React with custom hooks. It works but I still have to prop drill these hooks which is not great and I could make my code a bit cleaner. I totally forgot that React has a reducer and context and I should have used that to make my code cleaner. Custom Hooks are great but the only one that is used correctly is `useDelayUnmount` and `useMapData`.

It was hard choosing a map library. At first I wanted to go with Google Maps because I'm familiar with it but I ended up on Mapbox (react-map-gl) because of the clean design of the map so I can make the data pop. Also it is reasonably easy to use even though the documentation is a bit hard to read. Later I realized the documentation on mapbox-gl-js was a lot better.

Also searching for a date-picker was a bit hard and the one I have chosen is not great but it is doing the job better than others.

Feature creep was a bit of an issue and I should have planned it out a bit more. I should have focused more on the core features and incrementally improved them instead of constantly adding new features.

## TO DO

- Add follow-up call on earthquake click
- improve state management with useReducer and useContext
- Design and UX improvements
- Mobile optimizations

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
