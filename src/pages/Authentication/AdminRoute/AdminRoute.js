import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import Loading from '../../CommonSections/Loading/Loading';

const AdminRoute = ({children, ...rest}) => {
  const location = useLocation();
  const {user, isLoading} = useAuth();
  const [admin, setAdmin] = useState(null);
  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`);
      const result = await (await res).json();
      setAdmin(result);
    };
    load();
  },[user]);

  console.log(admin);
  
  if(isLoading || !admin){
    return <Loading />
  }
  if(!user){
    return <Navigate to={"/login"} state={{from:location}} />
  }
  if(user?.emailVerified || admin?.role === "admin" ){
    return children
  }
  else if(user && admin?.role !== "admin"){
    return <Navigate to={"/"} state={{from:location}} />
  }
  else{
    return <Navigate to={"/login"} state={{from:location}} />
  }
};

export default AdminRoute;