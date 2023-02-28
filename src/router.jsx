import React from 'react';
import {
  createBrowserRouter,
  redirect,
} from 'react-router-dom';

import { getUser, ping } from './utils/routeLoaders';

import ErrorPage from './views/ErrorPage';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import Leaderboard from './views/Leaderboard';

const router = createBrowserRouter([
  {
    path: 'auth',
    element: <Auth />,
    loader: async () => {
      if (!document.cookie.includes('XSRF-TOKEN=')) {
        const result = await ping();
        if (!result) {
          throw new Error(result);
        }
      }
      const user = await getUser();
      if (user) {
        return redirect('/v');
      }
      return { user };
    },
  },
  {
    path: '/',
    loader: () => {
      return redirect('/v');
    },
  },
  {
    path: '/v',
    // element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'predictions',
        element: <Dashboard />,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
    ].map((r) => ({
      errorElement: <ErrorPage />,
      loader: async (ctx) => {
        let loaderPayload;
        if (typeof r.loader === 'function') {
          loaderPayload = await r.loader(ctx);
        }
        if (!document.cookie.includes('XSRF-TOKEN=')) {
          const result = await ping();
          if (!result) {
            throw new Error(result);
          }
        }
        const user = await getUser();
        if (!user) {
          return redirect('/auth');
        }
        return { ...loaderPayload, user };
      },
      ...r,
    })),
  },
]);

export default router;
