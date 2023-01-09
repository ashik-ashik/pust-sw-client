import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';

const BlogDetail = () => {
  const {id} = useParams();
  

  const [blog, setBlog] = useState(null);
  useEffect(()=>{
    fetch(`https://pust-sw-server.vercel.app/blog/${id}`)
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
          {blog?.blogTitle ? <>
          <img src={blog?.blogImage} alt="" className="img-fluid" />
          <div className="py-3">
            <h3 className="title-font">{blog?.blogTitle}</h3>
            <p className="text-muted title-font">By: <Link  className="title-font publisherLink" to={`/member/${blog?.publisherId}`}>{blog?.publisherName}</Link>  | On: {blog?.publishedAt?.join(' ')}</p>

          </div>

          <div className='blog-content-detail'>
            <div className='mb-3' dangerouslySetInnerHTML={{ __html : blog?.blogContent }} ></div>
          </div>
            <div className="p-3 bg-light border-start border-3 border-dark">
              <h4 className="title-font">Summary:</h4>
              <p style={{fontStyle:"italic", fontSize:"16px"}}>{blog?.blogShortDesc}</p>
            </div>
          </> : <>
            <h4 className="styled-heading">Nothing found</h4>
          </>
          }

        </Container>
      </section>
    </>
  );
};

export default BlogDetail;