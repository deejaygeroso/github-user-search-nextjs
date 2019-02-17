# Oddle Project
This project is built on top of [Next.js](https://github.com/zeit/next.js) which is a framework for server-rendered React apps. One of its amazing features is it supports [lazy loading modules](https://nextjs.org/learn/excel/lazy-loading-modules) that does automatic code splitting which is based on the pages of the app and theres a lot more to this framework. 

**Other Technologies Used:**  
[Redux](https://redux.js.org/) - for handling state management of the project and uses.  
[Redux Thunk](https://github.com/reduxjs/redux-thunk) - for handling redux side effect api calls.  
[Material UI](https://material-ui.com/) - for styling components.  
[Axios](https://github.com/axios/axios) - for REST api calls.  


## Application Folder & File Structure  

  ```js
    ...
      __mocks__
      pages
      src
        actions
        modules
            search
               components
               containers
            user
               components
               containers
        reducers
        types
        store.js
      static
    ...
  ```
 
## Application Limitation Using Github Api.  
- Only the first 1000 search results are available when searching and paginating.  
- The app is not configured to use Basic Authentication or OAuth for github api so rate limit allows for up to 60 requests per hour only.  
- The Search API, when using Basic Authentication, OAuth, or client ID and secret, the rate limit allows you to make up to 10 requests per minute.  

## Application

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

**ESlint:** 

```sh
npm run lint
```



