import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

const EditTodo = () => {
  const {id} =useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [showEditTaskModal, setShowEditTaskModal] = useState(true);
  const [doAddComment, setAddComment] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(()=>{
    fetch(`https://pust-sw-server.vercel.app/todo-edit/${id}`)
    .then(res=>res.json())
    .then(result => setTodo(result ? result : {}))
  },[id]);


  const editTodo = (data) =>{
    axios.put(`https://pust-sw-server.vercel.app/todo-edit/${id}`, data)
    .then(res=>{
      if(res.status === 200){
        setShowEditTaskModal(false);
        navigate('/todo')
      }else{
        window.alert("OPPS!!! Update Fail!")
      };
      reset();
    })
  };

  const addComment= e => {
    if(e.target.checked){
      setAddComment(true);
    }else{
      setAddComment(false)
    }
  }


  return (
    <>
      {/* edit modal */}
      <Modal
              show={showEditTaskModal}
              onHide={()=>setShowEditTaskModal(false)}
              backdrop="static"
              keyboard={false}
              fullscreen='xxl-down'
              centered
              className='add-todo-modal'
            >
              <Modal.Header>
                <Container><Modal.Title>Edit Task</Modal.Title></Container>
              </Modal.Header>
                <Modal.Body>
                <Container>
              {
                  todo ? <>
                  <div className="add-task py-2">
                    <form onSubmit={handleSubmit(editTodo)}>
                      <div className="task-input-group">
                        <input {...register("taskTitle", {required:true})} defaultValue={todo?.taskTitle} type="text"  className='test-title bg-transparent' placeholder='Add Task Title' />
                        <textarea {...register("taskDetail")} cols="30" rows="4" className='test-detail bg-transparent' defaultValue={todo?.taskDetail} placeholder='Description'></textarea>
                        {
                         doAddComment || todo?.taskComment ? <>
                         <div className="commentBox border">
                           {todo?.taskComment && <span 
                           style={{fontSize:"12px"}}
                           className="ms-3 text-danger border-bottom border-secondary"
                           >
                             Comment:
                           </span> }
                          <textarea {...register("taskComment")} cols="10" rows="2" className='test-detail bg-transparent' style={{fontSize:"13px"}} defaultValue={todo?.taskComment} placeholder='Add comment'></textarea>
                        </div>
                        </>:<>
                        
                        </>
                        }
                        {
                          !todo?.taskComment && <>
                            <div className="border-top pt-2 mt-2">
                              <label htmlFor="addComment">
                                <input onChange={addComment} type="checkbox" className="d-none" id='addComment' /> <span style={{fontSize:"12px",cursor:'pointer' }} className={` me-3 py-1 px-3 rounded-pill border ${doAddComment ? 'bg-warning  text-white' : 'border-dark'} `}>{doAddComment ? 'Cancle' :'Add Comment'}</span>
                              </label>
                            </div>
                          </>
                        }
                      </div>
                      <div className="border-top py-3">
                        <Button type='submit' className='rounded-pill px-3 me-3' size="sm" variant="success">Update Task</Button>

                        <Button variant="outline-dark" className='rounded-pill px-3' size="sm" onClick={()=>{setShowEditTaskModal(false); navigate('/todo')}}>
                          Close
                        </Button>
                      </div>
                    </form>
                  </div>
                </> : <>
                Wait...
                </>}
                </Container>
              </Modal.Body>
            </Modal>
    </>
  );
};

export default EditTodo;