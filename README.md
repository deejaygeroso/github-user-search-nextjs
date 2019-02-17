# Oddle Project
This project is built on top of [Next.js](https://github.com/zeit/next.js) which is a framework for server-rendered React apps. One of its amazing features is it does support [lazy loading modules](https://nextjs.org/learn/excel/lazy-loading-modules) that does automatic code splitting which is based on the pages of the app and theres a lot more to it. 

**Other Technologies Used:**
[Redux](https://redux.js.org/) - for handling state management of the project and uses
[Redux Thunk](https://github.com/reduxjs/redux-thunk) - for handling redux side effect api calls.
[Material UI](https://material-ui.com/) - for styling components.
[Axios](https://github.com/axios/axios) - for REST api calls.

## View Live Application

You can view Live Application [here](ec2-18-223-119-153.us-east-2.compute.amazonaws.com).

**Development:** Installing and running the app on development:
```sh
npm install
npm run dev
```

**Production:** For building and running the app for production:

```sh
npm run build
npm run start
```

**ESlint:** For building and running application for production:

```sh
npm run lint
```

**Testing:** Uses Jest for testing. (Note: only few tests were written during development)

```sh
npm run test
```


