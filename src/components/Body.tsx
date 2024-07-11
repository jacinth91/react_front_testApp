import Browse from './Browser';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './Login';
import { moodContext ,moods} from '../utils/moods';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
]);

const Body = () => {
  return (
    <div>
      <moodContext.Provider value={moods}>
      <RouterProvider router={appRouter} />
      </moodContext.Provider>
      
    </div>
  );
};

export default Body;
