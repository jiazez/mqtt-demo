import React, { FC } from "react";
import { RouteObject } from "react-router";
import { useRoutes } from "react-router-dom";
import Ipad from "./Ipad";
import Home from "./Home";

const routesData: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "/ipad",
        element: <Ipad />,
      },
    ],
  },
];
const RouterView: FC = () => {
  return useRoutes(routesData);
};
export default RouterView;
