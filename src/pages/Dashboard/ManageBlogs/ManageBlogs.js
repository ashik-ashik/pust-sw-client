import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../CommonSections/Loading/Loading';

const ManageBlogs = () => {
  useEffect(()=>{
    document.title= "Manage Blog Posts"
  },[]);

  const [blogs, setBlogs] = useState(null);
  const [update, setUpdate] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [idForDelete, setIdForDelete] = useState(null);
  const [deleteDone, setDeleteDone] = useState(false);

  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/blogs`)
    .then(res => res.json())
    .then(result => setBlogs(result ? result : {}))
  },[update]);

  // dublicate blog
  const dublicate = (blog) => {
    setUpdate(true)
    const {_id, ...dublicate_blog} = blog;
    dublicate_blog.blogTitle = blog?.blogTitle + " (copy)";
    dublicate_blog.publishedAt = new Date().toDateString().split(" ").slice(1,4);
    axios.post(`https://warm-earth-97575.herokuapp.com/publish-blog`, dublicate_blog)
    .then(res=>{
      setUpdate(false)
    })
  };

  // delete blog
  const handleClose = () => setDeleteModal(false);
  const wantDelete = (id) => {
    setIdForDelete(id);
    setDeleteModal(true);
  }
  const deleteBlog = () => {
    setUpdate(true)
    setDeleteModal(false)
    axios.delete(`https://warm-earth-97575.herokuapp.com/blog-delete/${idForDelete}`)
    .then(res => {
      setUpdate(false);
      setDeleteDone(true);
    })
  }
  const handleDeleteDone = () => setDeleteDone(false);

  if(update){
    return <Loading />
  }

  return (
    <>
      <section className='py-4'>
        <Container fluid>
          <h3 className="styled-heading">Manage Blog Posts:</h3>
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                blogs?.map((blog, index) => <tr key={blog._id} >
                  <td>{index + 1}</td>
                  <td style={{width:"120px"}}>
                    <Link to={`/blog/${blog._id}`}>
                      <img src={blog?.blogImage} alt="" style={{width:"100px", height:"50px"}} />
                    </Link>
                  </td>
                  <td style={{minWidth:"250px"}}>
                    <Link to={`/blog/${blog._id}`}>{blog?.blogTitle}</Link>
                  </td>
                  <td className='text-nowrap'>
                    <Link  className="title-font publisherLink" to={`/member/${blog?.publisherId}`}>{blog?.publisherName}</Link>
                  </td>

                  <td className='text-nowrap' style={{width:"300px"}}>
                    <Button onClick={()=>wantDelete(blog?._id)} variant="danger" className="px-3 rounded-0 me-2" size="sm"><i className="bx bxs-trash me-2"></i> Delete</Button>
                    <Button onClick={()=> dublicate(blog)} variant="success" className="px-3 rounded-0 me-2" size="sm"><i className="bx bxs-copy me-2"></i> Dublicate</Button>
                    <Button variant="primary" className="px-3 rounded-0" size="sm"><i className="bx bxs-edit me-2"></i> Edit</Button>
                    </td>
                    {/*  d-flex align-items-center */}
                </tr>
                )
              }
            </tbody>
          </Table>
        </Container>
      </section>
        

        {/* want delete */}
      <Modal
        show={deleteModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false} 
        centered
      >
        <Modal.Body>
          <div className="py-4 text-center">
            <i className="bx bxs-trash display-3 text-danger"></i>
            <h5 className="title-font">Do you want to delete the Blog?</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteBlog} className='rounded-0 px-3' size="sm">
            Confirm
          </Button>
          <Button className='rounded-0' size="sm" onClick={handleClose} variant="primary">cancle</Button>
        </Modal.Footer>
      </Modal>

      {/* confirm deleted */}
      <Modal
        show={deleteDone}
        onHide={handleDeleteDone}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <div className="py-4 text-center">
            <i className="bx bxs-check-circle display-3 text-success"></i>
            <h3 className="title-font">Deleted Successfully</h3>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='rounded-0' size="md" onClick={handleDeleteDone} variant="primary">Okay</Button>
        </Modal.Footer>
      </Modal>
      
                
    </>
  );
};

export default ManageBlogs;