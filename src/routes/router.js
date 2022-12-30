import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import {
  AddTask,
  CompletedTasks,
  ErrorPage,
  Home,
  Login,
  MyTasks,
  SignUp,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-tasks",
        element: <MyTasks />,
      },
      {
        path: "/add-task",
        element: <AddTask />,
      },
      {
        path: "/completed-tasks",
        element: <CompletedTasks />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
