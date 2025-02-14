import { lazy, Suspense } from "react";
import Spinner from "../components/common/Spinner";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const Home = lazy(()=>import ("../components/Home"))
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Spinner />}>
    <Component />
  </Suspense>
);

const routesConfig: RouteObject[] = [
  
{
    path: "/",
    element:<Home/>,
    children:[
        {index:true, element:withSuspense(Home)}
    ]
  },


  ];
  export const mainRouter = createBrowserRouter(routesConfig);
  
