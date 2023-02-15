import React from "react";
// RouterProvider => tell React start rendering different components or path
//createBrowserRouter => configure the router
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import EventInfo from "./pages/EventInfo";
import LoginSignUp from "./pages/LoginSignUp";
import About from "./pages/About"
import ErrorPage from "./pages/Error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login_signup", element: <LoginSignUp /> },
      { path: "/tours", element: <EventsPage /> },
      { path: "/tours/:id", element: <EventInfo/>},
      { path: "/about", element: <About /> },
      { path: "/*", element: <ErrorPage/>}
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
