import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CRrequests from '../CRrequest/CRrequests';

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
  console.log(CR_requests?.length )
  return (
    <>
      <div className="py-4">
        <Container>
          <h3 className="styled-heading text-primary mb-4">CR-ship Requests:</h3>
          {
           CR_requests?.length > 0 ? CR_requests?.map(req => <CRrequests key={req._id} request={req} />) : <>
            <h6 className='fw-bold'>There is no CR Requests.</h6>
           </>
          }
        </Container>
      </div>
    </>
  );
};

export default Dashboard;