import React from 'react';
import { Table } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth/useAuth';

const BasicInfo = ({member}) => {
  const {user} = useAuth();


  return (
    <>
      <Table responsive striped bordered size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Information:</th>
          </tr>
        </thead>
        <tbody  className='text-capitalize'>
          
          <tr>
            <td>Reg:</td>
            <td>{member?.reg}</td>
          </tr>
          <tr>
            <td>Roll:</td>
            <td>{member?.roll}</td>
          </tr>
          <tr>
            <td>Batch:</td>
            <td>{member?.batchNo ? <>
              {member.batchNo}<sup className='text-lowercase'>th</sup>
            </>: "N/A"}</td>
          </tr>
          <tr>
            <td>Dept.</td>
            <td>{member?.dept}</td>
          </tr>
          <tr>
            <td>{user?.email === member?.email ? "CR Status" : "Is CR?"}</td>
            <td>{user?.email === member?.email ? member?.CRstatus : <>
              {member?.isCR ? "Yes" : "No"}
            </>}</td>
          </tr>
          
          <tr>
            <td>Blood Group:</td>
            <td>{member?.blood !== "none" ? member?.blood?.toUpperCase() : "N/A"}</td>
          </tr>

        </tbody>
      </Table>
    </>
  );
};

export default BasicInfo;