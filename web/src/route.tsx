import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
  import HomeCardList from '@views/home/index';
  import Ideal from '@views/ideal'
  import Labels from '@components/make-labels'
  import App from './App'

  export const router = createBrowserRouter([
     {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomeCardList />
            },
            {
                path: 'personal',
                element: <div className=" w-1/2"><Labels /></div>  
            }
        ]
     },
     {
        path: 'ideal',
        element: <Ideal />
    }
  ])