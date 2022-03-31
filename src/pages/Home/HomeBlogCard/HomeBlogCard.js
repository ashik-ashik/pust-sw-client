import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomeBlogCard = ({blog}) => {
  const [MM, DD, YY] =blog?.publishedAt;
  return (
    <>
      <Col>
        <div className="border bg-light">
          <div className="blog-image-overlay">
          <Link to={`/blog/${blog?._id}`}>
            <img src={blog?.blogImage} className="img-fluid" alt="" />
            <span className="blogDate title-font">{DD} {MM}, {YY}</span>
          </Link>
          </div>
          <div className="p-3">
            <h5><Link className='title-font home-blog-title' to={`/blog/${blog?._id}`}>{blog?.blogTitle}</Link> </h5>
            <p className="small" style={{textAlign:"justify"}}>
              {blog?.blogShortDesc?.split(" ")?.slice(0,20)?.join(" ")}...
            </p>
            <Link to={`/blog/${blog?._id}`}>
              <Button variant="success" size="sm" className="px-4 rounded-0">
                  Read More
              </Button>
            </Link>
          </div>
        </div>
      </Col>
    </>
  );
};

export default HomeBlogCard;