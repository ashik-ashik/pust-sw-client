import React from 'react';
import { Table } from 'react-bootstrap';

const AddressInfo = ({member}) => {
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
          <td colSpan={2} className='text-danger text-center fw-bold'>Present Address</td>
          
        </tr>
        <tr>
          <td>Is in Hall ?</td>
          <td>{member?.isHall ? "Yes" : "No"}</td>
        </tr>
        {
          member?.isHall ? <>
          <tr>
            <td>Hall Name</td>
            <td>{member?.hallName}</td>
          </tr>
          <tr>
            <td>Block</td>
            <td>{member?.hallBlock.toUpperCase()}</td>
          </tr>
          <tr>
            <td>Room No</td>
            <td>{member?.hallRoom}</td>
          </tr> 
          
          </> : <>

          <tr>
          <td>Mess Name</td>
          <td>{member?.messName}</td>
        </tr>
          <tr>
          <td>Mess Address</td>
          <td>{member?.messAddress}</td>
        </tr>
        </>
        }
          <tr>
          <td colSpan={2} className='text-danger text-center fw-bold'>Parmanent Address</td>
        </tr>
          <tr>
          <td>Village</td>
          <td>{member?.village}</td>
        </tr>
          <tr>
          <td>District</td>
          <td>{member?.district}</td>
        </tr>
          <tr>
          <td>Division</td>
          <td>{member?.division}</td>
        </tr>

        </tbody>
      </Table>
    </>
  );
};

export default AddressInfo;