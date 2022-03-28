import React, { createContext, useEffect, useState } from 'react';
import Loading from '../../pages/CommonSections/Loading/Loading';
import useAuth from '../../hooks/useAuth/useAuth';
export const MemberContext = new createContext();
const MemberProvider = ({children}) => {
  const {user} = useAuth()
  const [members, setMembers] = useState(null);
  const [currentMember, setMember] = useState(null);
  const [usersLoding, setUserLoading] = useState(true)
  useEffect(()=>{
    setUserLoading(true)
    fetch('https://warm-earth-97575.herokuapp.com/users')
      .then(res => res.json())
      .then(result => {
        setMembers(result ? result : {})
        setUserLoading(false)
      });
  },[user]);

  useEffect(()=>{
    setUserLoading(true)
      fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`)
      .then(res => res.json())
      .then(result => {
        setMember(result ? result : {})
        setUserLoading(false)
        })
  },[user]);
  
  if(usersLoding  || currentMember === null){
    return <Loading />
  }
  const sendMember = {members, currentMember}
  if(currentMember){return (
    <MemberContext.Provider value={sendMember}>
      {children}
    </MemberContext.Provider>
  );}
};

export default MemberProvider;