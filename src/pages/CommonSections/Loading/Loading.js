import React from 'react';

const Loading = () => {
  return (
    <>
      {/* <div className="reloading">
        <img src="https://i.ibb.co/thLH6tv/reloading.gif" alt="" />
      </div> */}
      <section className='spiner-container'>
	
        <div className='spin'>
          <div className='spin-1 spnning'></div>
          <div className='spin-2 spnning'></div>
          <div className='spin-3 spnning'></div>
          <div className='spin-4 spnning'></div>
          <div className='spin-5 spnning'></div>
          <div className='spin-6 spnning text-white fs-1 fw-bolder title-font'>SW</div>
        </div>

      </section>
    </>
  );
};

export default Loading;