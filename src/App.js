import React from "react";
// RouterProvider => tell React start rendering different components or path
//createBrowserRouter => configure the router
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import EventInfo from "./pages/EventInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/events", element: <EventsPage /> },
      { path: "/event-info", element: <EventInfo /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
