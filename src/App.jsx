import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as loginAction } from "./components/login/LoginForm";
import { action as activateAccountAction } from "./components/register/ActivateAccount";
import { Toaster } from "react-hot-toast";
import { action as NewPasswordVerificationAction } from "./components/reset password/NewPasswordVerification";
import { action as newPasswordAction } from "./components/reset password/NewPassword";
import { AuthProvider } from "./context/AuthContext";
import { HomeProvider } from "./context/HomeContext";
import { SocketProvider } from "./context/SocketContext";
import { ChatProvider } from "./context/ChatContext";
import { lazy, Suspense } from "react";
import Loader from "./ui/Loader";

// Lazy load components
const Register = lazy(() => import("./components/register/Register"));
const Login = lazy(() => import("./components/login/Login"));
const NotFound = lazy(() => import("./components/not-found/NotFound"));
const Home = lazy(() => import("./components/chats/Home"));
const ActivateAccount = lazy(
  () => import("./components/register/ActivateAccount"),
);
const NewPasswordVerification = lazy(
  () => import("./components/reset password/NewPasswordVerification"),
);
const NewPassword = lazy(
  () => import("./components/reset password/NewPassword"),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <ChatProvider>
          <SocketProvider>
            <HomeProvider>
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            </HomeProvider>
          </SocketProvider>
        </ChatProvider>
      </AuthProvider>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/activateAccount",
    element: (
      <Suspense fallback={<Loader />}>
        <ActivateAccount />
      </Suspense>
    ),
    action: activateAccountAction,
  },
  {
    path: "/newPasswordVerifiction",
    element: (
      <Suspense fallback={<Loader />}>
        <NewPasswordVerification />
      </Suspense>
    ),
    action: NewPasswordVerificationAction,
  },
  {
    path: "/newPassword",
    element: (
      <Suspense fallback={<Loader />}>
        <NewPassword />
      </Suspense>
    ),
    action: newPasswordAction,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
    action: loginAction,
  },
  {
    path: "/*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
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
