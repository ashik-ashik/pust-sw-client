import React, { createContext, useEffect, useState } from 'react';
import Loading from '../../pages/CommonSections/Loading/Loading';
import useAuth from '../../hooks/useAuth/useAuth';
export const MemberContext = new createContext();
const MemberProvider = ({children}) => {
  const {user} = useAuth()
  const [members, setMembers] = useState(null);
  useEffect(()=>{
    fetch('https://warm-earth-97575.herokuapp.com/users')
      .then(res => res.json())
      .then(result => setMembers(result))
  },[user]);
  
  if(!members){
    return <Loading />
  }
  return (
    <MemberContext.Provider value={members}>
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;