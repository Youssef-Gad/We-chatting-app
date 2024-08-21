import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/register/Register";
import { action as registerAction } from "./components/register/RegisterForm";
import Login from "./components/login/Login";
import NotFound from "./components/not-found/NotFound";
import Chats from "./components/chats/Chats";

const router = createBrowserRouter([
  { path: "/", element: <Chats /> },
  { path: "/register", element: <Register />, action: registerAction },
  { path: "/login", element: <Login /> },
  { path: "/*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
