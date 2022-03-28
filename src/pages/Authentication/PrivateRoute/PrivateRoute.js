import React, {useEffect, useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import Loading from '../../CommonSections/Loading/Loading';

const PrivateRoute = ({children, ...rest}) => {
  const location = useLocation();
  const {user, isLoading} = useAuth();
  const [member, setMember] = useState(null)
  useEffect(()=>{
      fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`)
      .then(res => res.json())
      .then(result => setMember(result))
      
  },[user, isLoading]);

  if(isLoading){
    return <>
          <Loading />
        </>
  }
  if(user){
    return children;
    // return <Navigate to={"/register"} state={{from:location}} />
  }
  // if(user && member?.isVerified){
  //   return children;
  // }
  // else if(user && !member?.isVerified){
  //   return <Navigate to={"/verify-your-account"} state={{from:location}} />
  // }
  else{
    return <Navigate to={"/register"} state={{from:location}} />
  }
  
};

export default PrivateRoute;