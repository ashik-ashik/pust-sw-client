import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import CRrequests from '../CRrequest/CRrequests';
import Loading from '../../CommonSections/Loading/Loading';
import DashboardHeader from '../DashboardHeader/DashboardHeader';

const CRrequestList = () => {
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
          <h3 className="styled-heading text-primary mb-4">CR-ship Requests:</h3>
            <Row xs={1} md={3} lg={4} className="g-4">
              {
                CR_requests?.length > 0 ? <>
                  {
                  CR_requests?.map(single => <CRrequests key={single?._id} request={single}  />)
                  }
                </> : <>
                  <h5 className="styled-heading text-danger">There is no CR request.</h5>
                </>
              }
            </Row>
        </Container>
      </div>
    </>
  );
};

export default CRrequestList;