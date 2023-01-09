import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';

const ManageNoticeCard = ({notice, member}) => {
  const deleteNotice = id => {
    const isDelete = window.confirm("Do you want to delete the notice???");
    if(isDelete){
      axios.delete(`https://pust-sw-server.vercel.app/notice-delete/${id}`)
      .then(res => {
        window.location.reload();
      });
    }
  }
  return (
    <>
      <div className="p-3 bg-light shadow mb-4">
          <h4 className="title-font">{notice?.noticeTitle}</h4>
          <p className="small">
            {
              notice?.noticeBody
            }
          </p>
          <p className="small">
            By: {notice?.publisherName + ' '} 
            {
              notice?.publishDate
            }
          </p>
          <div className="mt-4">
            {
              member?.role === 'admin' && <Button onClick={()=> deleteNotice(notice?._id)} variant="danger" size="sm" className='rounded-0 px-4'>Delete Notice</Button>
            }
          </div>
      </div>
    </>
  );
};

export default ManageNoticeCard;