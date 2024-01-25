import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Layout from './layout/layout';
import Dashboard from './view/dashboard';
import Page404 from './view/page404/page404';
import { Provider } from "react-redux";
import { store } from './redux/store';
import EmptyPage from './view/EmptyPage';
import { SnackbarProvider, useSnackbar, VariantType } from 'notistack';
// import { store } from './redux/store';
function App() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('User added successfully', { variant });
  };
  handleClickVariant("success")

  const router = createBrowserRouter([
    {
      // parent route component
      element: <Layout />,
      // child route components
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/organisation",
          element: <EmptyPage />,
        },
        {
          path: "/employees",
          element: <EmptyPage />,
        },
        {
          path: "/team",
          element: <EmptyPage />,
        },
        {
          path: "/payrolls",
          element: <EmptyPage />,
        },
        {
          path: "/office-calendar",
          element: <EmptyPage />,
        },


        // other pages....

      ],
      errorElement: <Page404 />,

    },
  ])



  return (
    <div className="App">

      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </Provider>



    </div>
  );
}

export default App;
