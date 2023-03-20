import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
  import Home from '@views/home/index';
  import Ideal from '@views/ideal'
  import App from './App'

  export const router = createBrowserRouter([
     {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'idea',
                element: <Ideal />
            }
        ]
     }
  ])