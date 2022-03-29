import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogCard = ({blog}) => {

  
  return (
    <>
      <Col>
        <div className="border">
          <img src={blog?.blogImage}  style={{height:"200px", width:"100%"}} alt="" className="img-fluid" />
            <div className="p-3">
              <h3 className=" mt-3">
                <Link className="title-font" to={`/blog/${blog?._id}`}>
                  {blog?.blogTitle}
                </Link>
              </h3>
              <p className="text-muted">By:  <Link  className="title-font publisherLink" to={`/member/${blog?.publisherId}`}>{blog?.publisherName}</Link>  | On: {blog?.publishedAt?.join(' ')}</p>
              <div className='blog-card-content mb-3'>
                {blog?.blogShortDesc?.split(" ")?.slice(0,25)?.join(" ")}
              </div>
              <Link to={`/blog/${blog?._id}`}>
                <Button variant="success" className="px-4 rounded-0 d-flex align-items-center" size="sm">Read More <i className="bx bx-right-arrow-alt ms-2"></i></Button>
              </Link>
            </div>
        </div>
      </Col>
    </>
  );
};

export default BlogCard;