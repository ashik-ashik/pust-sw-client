import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogCard = ({blog}) => {
  
  return (
    <>
      <Col>
        <img src={blog?.blogImage} alt="" className="img-fluid" />
          <h3 className=" mt-3">
            <Link className="title-font" to={`/blog/${blog?._id}`}>
              {blog?.blogTitle}
            </Link>
          </h3>
          <p className="text-muted" style={{fontSize:"12px"}}>By: {blog?.publisherName} | On: {blog?.publishedAt?.join(' ')}</p>
        <div className='blog-card-content mb-3' dangerouslySetInnerHTML={{ __html : blog?.blogContent }} ></div>
        <Link to={`/blog/${blog?._id}`}>
          <Button variant="success" className="px-4 rounded-0 d-flex align-items-center" size="sm">Read More <i className="bx bx-right-arrow-alt ms-2"></i></Button>
        </Link>
      </Col>
    </>
  );
};

export default BlogCard;