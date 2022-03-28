import React, { createContext, useEffect, useState } from 'react';
import Loading from '../../pages/CommonSections/Loading/Loading';
import useAuth from '../../hooks/useAuth/useAuth';
export const MemberContext = new createContext();
const MemberProvider = ({children}) => {
  const {user} = useAuth()
  const [members, setMembers] = useState(null);
  const [usersLoding, setUserLoading] = useState(true)
  useEffect(()=>{
    setUserLoading(true)
    fetch('https://warm-earth-97575.herokuapp.com/users')
      .then(res => res.json())
      .then(result => {
        setMembers(result)
        setUserLoading(false)
      });
  },[user]);
  
  if(usersLoding){
    return <Loading />
  }
  return (
    <MemberContext.Provider value={members}>
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;