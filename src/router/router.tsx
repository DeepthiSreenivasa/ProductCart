import Home from '../components/Home';
import Login from '../components/Login';
import { createBrowserRouter } from 'react-router-dom';
import Products from '../components/Products';
import App from '../App';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
  },
  {
    path: '/Login',
    element: <Login></Login>,
  },
  {
    path: '/Home',
    element: <Home></Home>,
  },
  {
    path: '/Products',
    element: <Products></Products>,
  },
]);

export default routes;
