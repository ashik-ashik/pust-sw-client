import React, { createContext, useEffect, useState } from 'react';
import Loading from '../../pages/CommonSections/Loading/Loading';
export const MemberContext = new createContext();
const MemberProvider = ({children}) => {
  const [members, setMembers] = useState(null);
  useEffect(()=>{
    const load = async () => {
      const res = await fetch('https://warm-earth-97575.herokuapp.com/users');
      const result = await res.json();
      setMembers(result);
    };
    load();
  },[]);
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