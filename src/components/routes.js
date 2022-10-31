import { DASHBOARD_ROUTE, LOGIN_ROUTE, ADDCOIN_ROUTE, CORRELATION_ROUTE } from "../utils/consts";
import DashBoard from "./Dashboard";
import Login from "./Login";
import AddCoin from "./AddCoin";
import Correlation from "../pages/CorrelationPage";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Login />,
  },
];

export const privateRoutes = [
  {
    path: DASHBOARD_ROUTE,
    Component: <DashBoard />,
  },
  {
    path: ADDCOIN_ROUTE,
    Component: <AddCoin />
  },
  {
    path: CORRELATION_ROUTE,
    Component: <Correlation />
  }
];
