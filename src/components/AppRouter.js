import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { privateRoutes, publicRoutes } from "./routes";

const AppRouter = () => {
  const user = false;

  return user ? 
    (
        <Routes>
            {privateRoutes.map(({path, Component}) =>
                <Route path={path} element={Component} exact={true} />
            )}
            <Route
                path="*"
                element={<Navigate to={CHAT_ROUTE} replace />}
            />
        </Routes>
    )
    :
    (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route path={path} element={Component} exact={true} />
            )}
            <Route
                path="*"
                element={<Navigate to={LOGIN_ROUTE} replace />}
            />
        </Routes>
    )
};

export default AppRouter;
