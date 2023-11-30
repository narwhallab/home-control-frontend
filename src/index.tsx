import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DeviceCardContainer from './components/DeviceCardContainer';
import Home from './components/Home';
import Security from './components/Security';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App child={<Home />} />
    )
  },
  {
    path: '/devices',
    element: (
      <App child={<DeviceCardContainer />} />
    )
  },
  {
    path: '/security',
    element: (
      <App child={<Security />} />
    )
  },
  {
    path: '/login',
    element: (
      <App child={<Login />} />
    )
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);