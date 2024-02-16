import "./index.css";
import Home from "./ui/Home";
import Menu, {Loader as menuLoader} from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Error from "./ui/Error";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error/>,
    children: [
      { ath: "/", element: <Home /> },
      { path: "/menu", element: <Menu />, loader: menuLoader, errorElement: <Error/> },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder /> },
      { path: "/order/:order", element: <Order /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
