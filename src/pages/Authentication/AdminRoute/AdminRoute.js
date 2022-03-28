import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import Loading from '../../CommonSections/Loading/Loading';

const AdminRoute = ({children, ...rest}) => {
  const location = useLocation();
  const {user, isLoading} = useAuth();
  const [admin, setAdmin] = useState(null);
  const [userLoad, setUserLoad] = useState(true)
  useEffect(()=>{
      setUserLoad(true)
      fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`)
      .then(res => res.json())
      .then(result => {
        setAdmin(result);
        setUserLoad(false);
      })
      
  },[user]);

  
  if(userLoad || isLoading){
    return <Loading />
  }
  if(!user){
    return <Navigate to={"/login"} state={{from:location}} />
  }
  if(admin?.isVerified && admin?.role === "admin" ){
  return children
  }
  else if(user && (admin?.role !== "admin")){
    return <Navigate to={"/"} state={{from:location}} />
  }
  else{
    return <Navigate to={"/login"} state={{from:location}} />
  }
};

export default AdminRoute;