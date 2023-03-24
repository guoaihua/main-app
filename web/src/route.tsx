import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
  import HomeCardList from '@views/home/index';
  import Ideal from '@views/ideal'
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
                path: '/article_detail',
                element: <>11</>,
                // lazy: ()=> import('')
            }
        ]
     },
     {
        path: 'collect_ideal',
        element: <Ideal />
    }
  ], {
    basename: '/ideal/'
  })