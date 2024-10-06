import React from "react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

//pages routes
const GamesList = lazy(() => import("../../pages/gamesList/GamesList"));
const Contact = lazy(() => import("../../pages/contact/Contact"));

const PagesRoutes = () => {
  const pages = [
    {
      element: <GamesList />,
      path: "/",
      suspense: "Loading...",
    },
    {
      element: <Contact />,
      path: "/contact-us",
      suspense: "Loading...",
    },
  ];
  return (
    <Routes>
      {pages.map((page, index) => (
        <Route
          key={index}
          path={page.path}
          element={
            <React.Suspense fallback={<div>{page.suspense}</div>}>
              {page.element}
            </React.Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default PagesRoutes;
