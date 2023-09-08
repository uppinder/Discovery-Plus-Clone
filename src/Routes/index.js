import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthMainLayout from '../Layouts/AuthMainLayout';
import MainLayout from '../Layouts/MainLayout';

import Home from '../Components/Home';
import Show from '../Components/Show';
import Premium from '../Components/Premium';

import Login from '../Pages/AuthPages/Login';
import Page404 from '../Pages/ErrorPages/Page404';
import Page500 from '../Pages/ErrorPages/Page500';

export default function Router() {
  return useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'go-premium-web',
          element: <Premium />,
        },
        {
          path: 'show/:showId',
          element: <Show />,
        },
      ],
    },
    {
      path: '',
      element: <AuthMainLayout />,
      children: [
        {
          path: 'login',
          element: <Login />,
        },
      ],
    },

    { path: '404', element: <Page404 /> },
    { path: '500', element: <Page500 /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
