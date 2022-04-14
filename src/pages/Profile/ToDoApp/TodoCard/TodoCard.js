import React from 'react';
import { Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TodoCard = ({todo, updateDone, setDeleteModal, getParticularId, findToEdit}) => {
  const [day, month, date, year] = todo.addDate.split(' ');
  return (
    <Col>
      <div className={`p-3 todo-shadow position-relative ${todo?.isComplete ? 'bg-light' : ''}`}>
      <span className="position-absolute todo-status">Status</span>
        {
          todo?.isComplete ? <span className="position-absolute todo-done">Completed</span> 
          : 
          <span className="position-absolute todo-active">Active</span>
        }
      
        <div className="pt-4">
          <div className="todo-date border-top py-2 d-flex justify-content-between">
            <span className=" title-font">{day}, {date} {month}, {year}</span>
            <span className=" title-font">{todo.addTime}</span>
          </div>
          <h4 className="title-font">{todo?.taskTitle}</h4>
          <p className="small text-muted">{todo?.taskDetail?.slice(0,70)}... <Link to={`${todo?._id}`} className="text-muted small ms-2">Read more</Link></p>
          {
          todo?.taskComment && <p className="text-mute" style={{fontSize:"10px"}}><span className="fw-bold">CC:</span> {todo?.taskComment?.slice(0,20)}...</p>
          }
          
        </div>
        <div className="pt-3 border-top text-center">
        <OverlayTrigger
          placement={'top'}
          overlay={
            <Tooltip id={`tooltip-complete`}>
              {todo?.isComplete ? 'completed' :'Make it complete'}
            </Tooltip>
          }
        >
          <i onClick={()=> updateDone(todo?._id)} className={`bx fs-4 me-3 todo-cursor-pointer ${todo?.isComplete ? 'bxs-check-circle' : 'bx-check-circle'}`}></i>
          </OverlayTrigger>

        <OverlayTrigger
          placement={'top'}
          overlay={
            <Tooltip id={`tooltip-complete`}>
              Edit task
            </Tooltip>
          }
        >
          <i onClick={()=> {findToEdit(todo?._id); getParticularId(todo?._id)}} className="bx bx-edit fs-4 me-3 todo-cursor-pointer"></i>
          </OverlayTrigger>
        <OverlayTrigger
          placement={'top'}
          overlay={
            <Tooltip id={`tooltip-complete`}>
              Delete task
            </Tooltip>
          }
        >
          <i onClick={()=> {setDeleteModal(true); getParticularId(todo?._id)}} className="bx bx-trash fs-4 todo-cursor-pointer"></i>
          </OverlayTrigger>
        </div>
      </div>
    </Col>
  );
};

export default TodoCard;