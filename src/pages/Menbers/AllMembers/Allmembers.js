import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Pagination, Row } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth/useAuth';
import Hearder from '../../CommonSections/Header/Hearder';
import MemberCard from './MemberCard/MemberCard';
import { useForm } from "react-hook-form";
import Loading from '../../CommonSections/Loading/Loading';
import useMember from '../../../hooks/useMembers/useMembers';

const Allmembers = () => {
  useEffect(()=>{
    document.title = "Members of Department of Social Work at PUST"
  }, []);
  const {user} = useAuth();
  const [uaers, setUsers] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [memberInAPage, setMemberInAPage] = useState(0);
  const {members} = useMember();
  const [searchedUser, setSearched] = useState(null);
  // const history = 
console.log(members);

  useEffect(()=> {
    fetch(`https://warm-earth-97575.herokuapp.com/member-show?page=${currentPage}&&size=${memberInAPage}`)
    .then(res => res.json())
    .then(data => {
      setUsers(data?.members);
      const memberPerPage=15;
      setMemberInAPage(memberPerPage)
      const pages = Math.ceil(data?.counts / memberPerPage);
      setPageCount(pages);
    });
  }, [currentPage, memberInAPage]);
  
  const { register, handleSubmit, reset } = useForm();
  // let searchedData = '';
  const onSubmit = ({data}) => {
    const rearch = members.filter(u => (u.roll === data) || (u.reg === data) || (u.fullName.toLowerCase().includes(data.toLowerCase())))
    setSearched(rearch);
    reset();
  }

  const reloadPage = () => {
    window.location.reload();
  }

 
  if(!uaers ){
    return <>
      <Loading />
    </>
  }

  return (
    <>
      <Hearder />

      <section className="allMemver-header">
        <Container>
        <h3 className="styled-heading text-white fs-2">Members</h3>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          
          <Row>
            <Col></Col>
            <Col md="10">  
              <div className="member-search m4-2">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <h5>You can find member:</h5>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="search by roll or reg no. or name"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2" 
                      {...register("data", {required: true})}
                    />
                    <Button variant="success" className='shadow-none px-4 ' type="submit">
                      Search
                    </Button>
                  </InputGroup>
                </Form>
              </div>
              {searchedUser && <h3 className='title-font'>Searched Result(s):</h3>}
              <Row xs={1} md={2} lg={3} className="g-4 mb-3">
                  {
                   !searchedUser && uaers?.map(user => <MemberCard key={user?._id} userInfo={user} />)
                  }
                    
                  {
                   searchedUser?.length > 0 ? searchedUser?.map(user => <MemberCard key={user?._id} userInfo={user} />) : <>
                    {(!uaers || (searchedUser?.length === 0)) && <h4 className="text-danger title-font">No result</h4>}
                   </>
                  }
                </Row>
                <div className="pt-3 border-top">
                <Pagination>
                  {
                  !searchedUser ? ([...Array(pageCount).keys()].map(pageNo => 
                    <Pagination.Item onClick={()=>setCurrentPage(pageNo)}  key={pageNo} active={pageNo === currentPage}>
                        {pageNo + 1}
                      </Pagination.Item>
                    )): <>
                      <Button onClick={reloadPage} size="sm" className="px-4 rounded-0">Back</Button>
                    </>
                  }
                  </Pagination>
                </div>

            </Col>
            <Col></Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Allmembers;