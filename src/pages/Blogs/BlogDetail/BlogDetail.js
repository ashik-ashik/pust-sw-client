import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';

const BlogDetail = () => {
  const {id} = useParams();
  

  const [blog, setBlog] = useState(null);
  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/blog/${id}`)
    .then(res=>res.json())
    .then(result=>setBlog(result ? result : {}))
  }, [id]);

  useEffect(()=>{
    document.title= blog?.blogTitle || "Blog"
  },[blog]);

  if(!blog){
    return <Loading />
  }
  return (
    <>
      <Hearder />
      <section className="py-4">
        <Container>
          <img src={blog?.blogImage} alt="" className="img-fluid" />
          <div className="py-3">
            <h3 className="title-font">{blog?.blogTitle}</h3>
            <p className="text-muted small">By: {blog?.publisherName} | On: {blog?.publishedAt?.join(' ')}</p>

          </div>

          <div className='mb-3' dangerouslySetInnerHTML={{ __html : blog?.blogContent }} ></div>

        </Container>
      </section>
    </>
  );
};

export default BlogDetail;