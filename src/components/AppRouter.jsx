import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/context';
import { privetRoutes, publicRoutes } from '../router/route';
import Loader from './UI/loader/Loader';


const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);

  if(isLoading){
    return <Loader/>
  }

  return (
    isAuth
      ? 
      <Routes>
        {privetRoutes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
            exect={route.exect}
          />
        )}
        <Route
          path="*"
          element={<Navigate to="error" />}
        />
      </Routes>
      :
      <Routes>
        {publicRoutes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
            exect={route.exect}
          />
        )}
        <Route
          path="*"
          element={<Navigate to="login" />}
        />
      </Routes>
  );
}

export default AppRouter;
