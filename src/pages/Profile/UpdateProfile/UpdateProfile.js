import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateProfile = () => {
  const {email} = useParams();
  useEffect(()=>{
    fetch(`http://localhost:5500/currentUser/${email}`)
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])
  return (
    <>
      
    </>
  );
};

export default UpdateProfile;