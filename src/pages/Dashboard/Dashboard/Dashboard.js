import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import CRrequests from '../CRrequest/CRrequests';
import Loading from '../../CommonSections/Loading/Loading';
import DashboardHeader from '../DashboardHeader/DashboardHeader';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const load = async ()=>{
      const res = await fetch("https://warm-earth-97575.herokuapp.com/users");
      const result = await res.json();
      setUser(result);
    };
    load();
  }, [])
  const CR_requests = user?.filter(ceReq => ceReq?.CRstatus === "pending");
  
  if(!user){
    return <>
    <Loading />
    </>
  }
  return (
    <>
      <DashboardHeader />
      <div className="py-4">
        <Container>
          <h3 className="display-3 text-center">Welcome to Dashboard</h3>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;