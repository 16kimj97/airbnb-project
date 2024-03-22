import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './store/Navigation/Navigation';
import LandingPage from './store/components/LandingPage/LandingPage'
import SpotId from './store/components/SpotId/SpotId'
import CreateSpot from './store/components/CreateSpot/CreateSpot';
import ManageSpotPage from './store/components/ManageSpot/ManageSpot';
import UpdateSpotForm from './store/components/UpdateSpot/UpdateSpot';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        path: '/',
        element: <LandingPage />
      },
      {
        index: true,
        path: '/spots/:spotId',
        element: <SpotId />
      },
      {
				index: true,
				path: "/spots/new",
				element: <CreateSpot title="Create Spot" />,
			},
      {
        index: true,
				path: "/spots/current",
				element: <ManageSpotPage />
			},
      { index: true,
        path: "/spots/:spotId/edit",
        element: <UpdateSpotForm />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
