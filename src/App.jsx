import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/register/Register";
import { action as registerAction } from "./components/register/RegisterForm";
import Login from "./components/login/Login";
import NotFound from "./components/not-found/NotFound";
import Home from "./components/chats/Home";
import ActivateAccount, {
  action as activateAccountAction,
} from "./components/register/ActivateAccount";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register />, action: registerAction },
  {
    path: "/activateAccount",
    element: <ActivateAccount />,
    action: activateAccountAction,
  },
  { path: "/login", element: <Login /> },
  { path: "/*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
