import React, { useEffect } from 'react';
import Hearder from '../CommonSections/Header/Hearder';

const NotFound = () => {
  useEffect(()=>{
    document.title = "Page not found";
  }, []);
  return (
    <>
    <Hearder />
      
    </>
  );
};

export default NotFound;