import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
  import HomeCardList from '@views/home/index';
  import Ideal from '@views/ideal'
  import ArticalDetail  from "@views/detail";
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
                element: <ArticalDetail />
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