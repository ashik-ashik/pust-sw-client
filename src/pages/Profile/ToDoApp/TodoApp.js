import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import TodoNav from './TodoNav/TodoNav';

const TodoApp = () => {
  useEffect(()=>{
    document.title="My To Do APP"
  },[]);

  const [day, month, date] = new Date().toDateString().split(' ');
  return (
    <>
      <TodoNav/>
      <section className="py-4">
        <Container>
          <h4 className="title-font border-bottom">Today <span className='ms-2 fw-bold text-secondary' style={{fontSize:'13px'}}>{day +" "+ date +" "+ month}</span> :</h4>
        </Container>
      </section>
    </>
  );
};

export default TodoApp;