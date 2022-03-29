import React, {useState, useEffect, useRef} from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Hearder from '../../CommonSections/Header/Hearder';
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import useMember from '../../../hooks/useMembers/useMembers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PublishBlog = () => {
  useEffect(()=>{
    document.title = "Publish A New Blog Post"
  },[]);

  const {currentMember} = useMember();
  const navigate = useNavigate();
  
  const editor = useRef(null)
  const [content, setContent] = useState('');
  const config = {
    buttons : ["bold", "underline", "italic", "brush", 'paragraph', "|", "ol", "ul", "link",  'table', 'undo', 'redo', '|', "image", ]
  };

  const { register, handleSubmit } = useForm();
  const publishBlog = blog => {
    blog.blogContent = content;
    blog.publisherName = currentMember?.fullName;
    blog.publisherEmail = currentMember?.email;
    blog.publishedAt = new Date().toDateString().split(" ").slice(1,4);
    console.log(blog)
    axios.post(`https://warm-earth-97575.herokuapp.com/publish-blog`, blog)
    .then(res=>{
      navigate("/blogs")
    })
  }

  return (
    <>
      <Hearder />

      <section className="py-4 publish-notice">
        <Container>
          <h2 className="border-start border-3 styled-heading text-light border-warning ps-3 mb-4">Publish A New Blog:</h2>

          <Form onSubmit={handleSubmit(publishBlog)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='text-white small'>Blog Title</Form.Label>
                <Form.Control className='shadow-none transparent-field-event' {...register("blogTitle", {required : true})} type="text" placeholder="Enter Blog Title" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='text-white small'>Blog Image</Form.Label>
                <Form.Control className='shadow-none transparent-field-event' {...register("blogImage", {required : true})} type="text" placeholder="Enter image url" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
              <p className="small text-light">Event Content/Events</p>
              <div className="transparent-field-event">
                <JoditEditor 
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={newContent => setContent(newContent)}
                  tabIndex={1} // tabIndex of textarea
                  />
              </div>
              </Form.Group>

              <Button variant="primary" className="rounded-0 px-4" type="submit">
                Publish
              </Button>
            </Form>
        </Container>
      </section>
    </>
  );
};

export default PublishBlog;