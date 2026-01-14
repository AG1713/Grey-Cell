import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CreateDiscussion from "./features/discussions/CreateDiscussion.tsx";
import Chat from "./features/chat/Chat.tsx";
import Layout from "./features/sidebar/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CreateDiscussion />,
      },
      {
        path: "/discussions/:id",
        element: <Chat />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
