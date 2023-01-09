import React, { useEffect, useState } from 'react';
import { Modal, Button, Container, Row } from 'react-bootstrap';
import useMember from '../../../hooks/useMembers/useMembers';
import TodoNav from './TodoNav/TodoNav';
import { useForm } from "react-hook-form";
import './Todo.css';
import axios from 'axios';
import TodoCard from './TodoCard/TodoCard';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const TodoApp = () => {
  useEffect(()=>{
    document.title="My To Do APP"
  },[]);
  const locat = useLocation();
  const {currentMember} = useMember();
  const [isNewAntry, setNewAntry] = useState(false)
  const [filtering, setFiltering] = useState('all');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [singleTodoId, setSingleTodoId] = useState('')
  const [todos, setTodos] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    fetch(`https://pust-sw-server.vercel.app/todo/${currentMember?._id}`)
    .then(res=>res.json())
    .then(result => {
      setTodos(result ? result : {});
      setNewAntry(false);
    })
  },[currentMember, isNewAntry, locat]);


  // get data from the form
  const { register, handleSubmit, reset } = useForm();
  const getTastData = data => {
    data.userId = currentMember?._id;
    data.addDate = new Date().toDateString();
    data.addTime = new Date().toLocaleTimeString();
    data.isComplete = false;

    axios.post(`https://pust-sw-server.vercel.app/todo`, data)
    .then(res => {
      if(res.status === 200){
        setNewAntry(true);
        setShowAddTaskModal(false);
        reset();
      };
    })
  };

  const updateDone = (id) => {
    axios.put(`https://pust-sw-server.vercel.app/todo-update/${id}`)
    .then(res=>{
      if(res.status === 200){
        setNewAntry(true);
      };
    })
  };

  const getParticularId = id => {
    setSingleTodoId(id);
  }
  const letsDeleteTodo = () => {
    axios.delete(`https://pust-sw-server.vercel.app/todo-delete/${singleTodoId}`)
    .then(res => {
      if(res){
        setNewAntry(true);
        setDeleteModal(false);
      };
    })
  };
  
  const findToEdit = (isOpen) => {
    navigate(`edit/${isOpen}`);
  }


  let incompleteTodo = todos?.filter(todo => todo?.isComplete !== true);
   const completeTodo = todos?.filter(todo => todo?.isComplete === true);


  const [day, month, date] = new Date().toDateString().split(' ');

  return (
    <>
      <TodoNav/>
      <Outlet />
      <section className="py-4">
        <Container>
          <h3 className="title-font border-bottom">Today 
          <span className='ms-2 fw-bold text-secondary' style={{fontSize:'12px'}}>{day +" "+ date +" "+ month}</span> :
          </h3>


          <div className="py-2">
            <Modal
              show={showAddTaskModal}
              onHide={()=>setShowAddTaskModal(false)}
              backdrop="static"
              keyboard={false}
              fullscreen='xxl-down'
              centered
              className='add-todo-modal'
            >
              <Modal.Header>
                <Container><Modal.Title>Add New Task</Modal.Title></Container>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <div className="add-task py-2">
                    <form onSubmit={handleSubmit(getTastData)}>
                      <div className="task-input-group">
                        <input {...register("taskTitle", {required:true})} type="text"  className='test-title bg-transparent' placeholder='Add Task Title' />
                        <textarea {...register("taskDetail")} cols="30" rows="4" className='test-detail bg-transparent' placeholder='Description'></textarea>
                      </div>
                      <div className="border-top py-3">
                        <Button type='submit' className='rounded-pill px-3 me-3' size="sm" variant="success">Add Task</Button>

                        <Button variant="outline-dark" className='rounded-pill px-3' size="sm" onClick={()=>setShowAddTaskModal(false)}>
                          Close
                        </Button>
                      </div>
                    </form>
                  </div>
                </Container>
              </Modal.Body>
            </Modal>
            <Button onClick={()=>setShowAddTaskModal(true)} variant='danger' size='sm' className='rounded-pill px-3 shadow-none'><i className="bx bx-plus"></i> Add Task</Button>          
          </div>

          <Container>
            <div className="py-3">
                <Button onClick={()=>setFiltering('all')} variant={filtering === 'all' ? `success` : 'outline-success'} className='me-2 rounded-pill px-3 shadow-none' size='sm'>All</Button>
                <Button onClick={()=>setFiltering('active')} variant={filtering === 'active' ? `success` : 'outline-success'} className='me-2 rounded-pill px-3 shadow-none' size='sm'>Active</Button>
                <Button onClick={()=>setFiltering('completed')} variant={filtering === 'completed' ? `success` : 'outline-success'} className='rounded-pill px-3 shadow-none' size='sm'>Completed</Button>
            </div>
          <Row xs={1} md={1} lg={2} className='g-4 mt-4'>
            {
              ((filtering === 'active' && incompleteTodo) || (filtering === 'completed' && completeTodo) || (filtering === 'all' && todos) )?.map(todo => <TodoCard key={todo?._id} todo={todo} updateDone={updateDone} setDeleteModal={setDeleteModal} getParticularId={getParticularId} findToEdit={findToEdit} />)
            }
            
            </Row>
          </Container>

          {
            ((filtering === 'active' && incompleteTodo) || (filtering === 'completed' && completeTodo) || (filtering === 'all' && todos))?.length <= 0 && <>
              <div className="text-center mt-5 pt-5">
                <img src="https://i.ibb.co/K9QwXXs/empty.png" alt="" className="img-fluid w-50" />
                
                <h6 className='mt-3'>Get a clear view of the day ahead</h6>
                <p className="mb-4 small text-muted">All your tasks that are due today will show up here.</p>
                <Button onClick={()=>setShowAddTaskModal(true)} variant='danger' size='sm' className='rounded-pill px-3'><i className="bx bxs-plus-circle"></i> Add Task</Button>
              </div>
            </>
          }

        </Container>
      </section>

      


      {/* delete modal */}

    <Modal 
    show={deleteModal}
    onHide={()=>setDeleteModal(false)}
    backdrop="static"
    keyboard={false}
    centered
    >
      <Modal.Body>
        <div className="pt-3 pb-5">
          <div className="text-center mb-4">
            <i className="bx bx-trash display-1 text-danger"></i>
          </div>
          <h5>Do you want to delete <span className='text-danger'>{(todos?.find(todo => todo?._id === singleTodoId))?.taskTitle}</span></h5>
        </div>
        <div className="add-task py-2 text-end">
        <Button variant="danger" className='rounded-pill px-3 me-3' size="sm" onClick={letsDeleteTodo}>
          Delete
        </Button>
        <Button variant="outline-dark" className='rounded-pill px-3' size="sm" onClick={()=>setDeleteModal(false)}>
          Cancel
        </Button>
        </div>
      </Modal.Body>
    </Modal>

    </>
  );
};

export default TodoApp;