import React, { useEffect, useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const TodoDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [showDetailTaskModal, setShowDetailTaskModal] = useState(true)
  useEffect(()=>{
    fetch(`https://pust-sw-server.vercel.app/todo-edit/${id}`)
    .then(res=>res.json())
    .then(result => setTodo(result ? result : {}))
  },[id]);
  return (
    <>
      <Modal
              show={showDetailTaskModal}
              onHide={()=>setShowDetailTaskModal(false)}
              backdrop="static"
              keyboard={false}
              fullscreen='xxl-down'
              centered
              className='add-todo-modal'
            >
              <Modal.Header>
                <Container><Modal.Title>Task Details:</Modal.Title></Container>
              </Modal.Header>
                <Modal.Body>
                <Container>
              {
                  todo ? <>
                  <div className="add-task py-2">
                    <h4>{todo?.taskTitle}</h4>
                    <p>{todo?.taskDetail}</p>
                    <p className="mb-4 ps-2 border-start border-2 border-danger" style={{fontStyle:"italic"}}>
                      {todo?.taskComment}
                    </p>
                    <Button onClick={()=>navigate('/todo')} variant='outline-dark' className='px-4 rounded-pill' size="sm">Back</Button>
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

export default TodoDetail;