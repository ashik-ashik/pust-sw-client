import React, {useEffect, useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import Loading from '../../CommonSections/Loading/Loading';

const PrivateRoute = ({children, ...rest}) => {
  const location = useLocation();
  const {user, isLoading} = useAuth();
  const [member, setMember] = useState(null)
  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`)
      const result = await res.json();
      setMember(result);
    }
    load();
  },[user]);

  if(isLoading){
    return <>
          <Loading />
        </>
  }
  if(user && member?.isVerified){
    return children;
  }
  else if(user && !member?.isVerified){
    return <Navigate to={"/verify-your-account"} state={{from:location}} />
  }
  else{
    return <Navigate to={"/register"} state={{from:location}} />
  }
  
};

export default PrivateRoute;