import React from 'react';
import moment from "moment";
import Dropdown from 'react-bootstrap/Dropdown';
import toast from "react-hot-toast";
import { statuschange } from '../components/Action/allApi';

const Table = ({ tickets, getTickets }) => {
  
    const handleChange = async (ticketId, status) => {
        const response = await statuschange(ticketId, status);
    
        if (response.status === 200) {
          getTickets();
          toast.success("Status Updated")
        } else {
          toast.error("error ")
        }
      }

  return (
    <>
      <div className="row ">
        <div className="col-md-9  mt-5">
          <h1 className="text-center">All Tickets</h1>
          {tickets?.map((t, i) => {
            return (
              <div className="border shadow mb-3 mt-3" key={t._id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">Updated Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    tickets.length <= 0 ? tickets.map((t, i) => {
                      return (
                        <>
                        <div className='no_data text-center'>NO Data Found</div>
                          
                        </>
                    )
                    }) : 
                        <tr>
                            <td>{i + 1}</td>
                            <td>{t.status}</td>
                            <td>{moment(t?.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                            <td>{moment(t?.updatedAt).format("DD-MM-YYYY HH:mm")}</td>
                            <td>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleChange(t._id, "Pending")}>Pending</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleChange(t._id, "Accepted")}>Accepted</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleChange(t._id, "Resolved")}>Resolved</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleChange(t._id, "Rejected")}>Rejected</Dropdown.Item>
                            </Dropdown.Menu>
                            </td>
                        </tr>
                  }
                  </tbody>
                </table>
                <div className="container">
                    <div className="row mb-2 p-3 card flex-row" key={t._id}>
                    <table className="table data">
                    <tbody>
                      <tr >
                        <td>{t.title}</td>
                        <td>{t.description}</td>
                        <td>{t.contact}</td>
                      </tr>
                    </tbody>
                    </table>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Table;