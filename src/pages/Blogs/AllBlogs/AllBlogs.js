import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';
import BlogCard from '../BlogCard/BlogCard';

const AllBlogs = () => {
  useEffect(()=>{
    document.title= "Blogs From PUST SW"
  },[]);

  const [blogs, setBlogs] = useState(null);
  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/blogs`)
    .then(res => res.json())
    .then(result => setBlogs(result ? result : {}))
  },[]);

  if(!blogs){
    return <Loading />
  }
  console.log(blogs)
  return (
    <>
      <Hearder />
      <div className="py-4 publish-notice">
        <Container>
          <h2 className="border-start border-3 border-warning styled-heading text-white ps-3">Blogs</h2>
        </Container>
      </div>
      <section className="py-3">
        <Container>
          <Row xs={1} md={2} className="g-3" >
            {
              blogs?.map(blog=> <BlogCard key={blog?._id} blog={blog} />)
            }
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AllBlogs;