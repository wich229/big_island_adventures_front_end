
// RouterProvider => tell React start rendering different components or path
//createBrowserRouter => configure the router
import {  RouterProvider, createBrowserRouter} from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import EventInfo from "./pages/EventInfo";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import ErrorPage from "./pages/Error";
import Client from "./pages/Client";
import ConfirmBooking from "./pages/ConfirmBooking";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from './UserContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <LogIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/tours", element: <EventsPage /> },
      { path: "/tours/:id", element: <EventInfo /> },
      { path: "/about", element: <About /> },
      { path: "/tours/client/:id", element: <Client /> },
      { path: "/confirmation", element: <ConfirmBooking /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/*", element: <ErrorPage /> },
    ],
  },
]);

const App = () => {
  return (<UserProvider>
    <RouterProvider router={router} /></UserProvider>)
};

export default App;
