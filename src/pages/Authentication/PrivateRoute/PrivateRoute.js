import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';

const PrivateRoute = ({children, ...rest}) => {
  const location = useLocation();
  const {user, isLoading} = useAuth();
  console.log(user, isLoading, children)

  if(isLoading){
    return <h4>Loading...</h4>
  }
  if(user?.email){
    return children;
  }
  else{
    return <Navigate to={"/register"} state={{from:location}} />
  }
  
};

export default PrivateRoute;