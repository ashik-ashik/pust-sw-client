import React, { createContext, useEffect, useState } from 'react';
import Loading from '../../pages/CommonSections/Loading/Loading';
import useAuth from '../../hooks/useAuth/useAuth';
export const MemberContext = new createContext();
const MemberProvider = ({children}) => {
  const {user} = useAuth()
  const [members, setMembers] = useState(null);
  const [currentMember, setMember] = useState(null);
  const [usersLoding, setUserLoading] = useState(true);
  const [reLoad, setReLoad] = useState(false);
  useEffect(()=>{
    setUserLoading(true)
    fetch('https://pust-sw-server.vercel.app/users')
      .then(res => res.json())
      .then(result => {
        setMembers(result ? result : {})
        setUserLoading(false);
        setReLoad(false);
      }).catch(err=>{
        console.log(err.message);
      });
  },[user, reLoad]);

  useEffect(()=>{
    setUserLoading(true)
      fetch(`https://pust-sw-server.vercel.app/currentUser/${user?.email}`)
      .then(res => res.json())
      .then(result => {
        setMember(result ? result : {})
        setUserLoading(false);
        setReLoad(false);
        })
  },[user, reLoad]);
  
  if(usersLoding  || currentMember === null){
    return <Loading />
  }
  const sendMember = {members, currentMember, setReLoad}
  if(currentMember){return (
    <MemberContext.Provider value={sendMember}>
      {children}
    </MemberContext.Provider>
  );}
};

export default MemberProvider;