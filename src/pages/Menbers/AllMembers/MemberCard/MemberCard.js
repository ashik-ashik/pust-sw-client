import React from 'react';
import { Card, Col, Table } from 'react-bootstrap';

const MemberCard = ({userInfo}) => {
  console.log(userInfo);
  return (
    <>
      <Col>
        <div className="member-card">
          <div className="member-image">
            <img src="" alt="Member" />
          </div>
          <div className="member-info">
            <table>
              <tbody>
                <tr>
                  <td>Roll</td>
                  <td>:{userInfo?.roll}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Col>
    </>
  );
};

export default MemberCard;