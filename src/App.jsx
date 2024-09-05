import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/register/Register";
import { action as loginAction } from "./components/login/LoginForm";
import Login from "./components/login/Login";
import NotFound from "./components/not-found/NotFound";
import Home from "./components/chats/Home";
import ActivateAccount, {
  action as activateAccountAction,
} from "./components/register/ActivateAccount";
import { Toaster } from "react-hot-toast";
import NewPasswordVerification, {
  action as NewPasswordVerificationAction,
} from "./components/reset password/NewPasswordVerification";
import NewPassword, {
  action as newPasswordAction,
} from "./components/reset password/NewPassword";
import { AuthProvider } from "./context/AuthContext";
import { HomeProvider } from "./context/HomeContext";
import { SocketProvider } from "./context/SocketContext";
import { ChatProvider } from "./context/ChatContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <SocketProvider>
          <ChatProvider>
            <HomeProvider>
              <Home />
            </HomeProvider>
          </ChatProvider>
        </SocketProvider>
      </AuthProvider>
    ),
  },
  { path: "/register", element: <Register /> },
  {
    path: "/activateAccount",
    element: <ActivateAccount />,
    action: activateAccountAction,
  },
  {
    path: "/newPasswordVerifiction",
    element: <NewPasswordVerification />,
    action: NewPasswordVerificationAction,
  },
  { path: "/newPassword", element: <NewPassword />, action: newPasswordAction },
  { path: "/login", element: <Login />, action: loginAction },
  { path: "/*", element: <NotFound /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
