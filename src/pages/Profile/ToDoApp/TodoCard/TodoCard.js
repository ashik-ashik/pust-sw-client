import React from 'react';
import { Col } from 'react-bootstrap';

const TodoCard = ({todo, updateDone, setDeleteModal, getIdForDelete}) => {
  return (
    <Col>
      <div className={`p-3 todo-shadow position-relative ${todo?.isComplete ? 'bg-light' : ''}`}>
        <span className="position-absolute todo-done">Done</span>
        <div className="pt-3">
          <h4 className="title-font">{todo?.taskTitle}</h4>
          <p className="small text-muted">{todo?.taskDetail}</p>
        </div>
        <div className="pt-3 border-top text-center">
          <i onClick={()=> updateDone(todo?._id)} className={`bx fs-4 me-3 todo-cursor-pointer ${todo?.isComplete ? 'bxs-check-circle' : 'bx-check-circle'}`}></i>
          <i className="bx bx-edit fs-4 me-3 todo-cursor-pointer"></i>
          <i onClick={()=> {setDeleteModal(true); getIdForDelete(todo?._id)}} className="bx bx-trash fs-4 todo-cursor-pointer"></i>
        </div>
      </div>
    </Col>
  );
};

export default TodoCard;