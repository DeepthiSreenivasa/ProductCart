import { RouterProvider } from 'react-router-dom';
import routes from '../router/router';

const ProductSellingCartRouterProvider = () => {
  return <RouterProvider router={routes}></RouterProvider>;
};

export default ProductSellingCartRouterProvider;
