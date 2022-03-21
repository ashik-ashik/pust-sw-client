import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Pagination, Row } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth/useAuth';
import Hearder from '../../CommonSections/Header/Hearder';
import MemberCard from './MemberCard/MemberCard';
import { useForm } from "react-hook-form";
import Loading from '../../CommonSections/Loading/Loading';

const Allmembers = () => {
  useEffect(()=>{
    document.title = "Members of Department of Social Work at PUST"
  }, []);
  const {user} = useAuth();
  const [members, setUsers] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [memberInAPage, setMemberInAPage] = useState(0);
  const [allMember, setAllMember] = useState(null);
  const [searchedUser, setSearched] = useState(null);
  // const history = 
  useEffect(()=>{
    const load = async()=> {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/users`);
      const result = await res.json();
      setAllMember(result);
    };
    load();
  },[user]);

  useEffect(()=> {
    fetch(`https://warm-earth-97575.herokuapp.com/member-show?page=${currentPage}&&size=${memberInAPage}`)
    .then(res => res.json())
    .then(data => {
      setUsers(data?.members);
      let memberPerPage=0;
      if(data?.counts <= 10){
        memberPerPage = 10;
      }else if((data?.counts > 10) && (data?.counts <= 30)){
        memberPerPage = 6;
      }
      else if((data?.counts > 30) && (data?.counts <= 60)){
        memberPerPage = 9;
      }
      else if((data?.counts > 60) && (data?.counts <= 100)){
        memberPerPage = 15;
      }
      else if((data?.counts > 100) && (data?.counts <= 150)){
        memberPerPage = 18;
      }
      else if((data?.counts > 150) && (data?.counts <= 250)){
        memberPerPage = 24;
      }
      else{
        memberPerPage = 30;
      }
      setMemberInAPage(memberPerPage)
      const pages = Math.ceil(data?.counts / memberPerPage)
      setPageCount(pages);
    });
  }, [currentPage, memberInAPage]);
  
  const { register, handleSubmit, reset } = useForm();
  // let searchedData = '';
  const onSubmit = ({data}) => {
    const rearch = allMember.filter(u => (u.roll === data) || (u.reg === data) || (u.fullName.toLowerCase().includes(data.toLowerCase())))
    setSearched(rearch);
    reset();
  }

  const reloadPage = () => {
    window.location.reload();
  }

 
  if(!members && !searchedUser){
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
                   !searchedUser && members?.map(user => <MemberCard key={user?._id} userInfo={user} />)
                  }
                    
                  {
                   searchedUser?.length > 0 ? searchedUser?.map(user => <MemberCard key={user?._id} userInfo={user} />) : <>
                    {(!members || (searchedUser?.length === 0)) && <h4 className="text-danger title-font">No result</h4>}
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