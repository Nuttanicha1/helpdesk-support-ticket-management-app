import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import moment from "moment";
import toast from "react-hot-toast";
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { HiOutlineTicket } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;


const TicketList = () => {

    const [tickets, setTickets] = useState([]);
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [status] = useState([
        "Pending", "Accepted", "Resolved", "Rejected"
      ]);

    const getTickets = async () => {
        try {
          const { data } = await axios.get("/api/v1/ticket/get-ticket");
          if (data?.success) {
            setTickets(data?.tickets);
          } else if (! auth?.token) {
            toast.error("Please Login Before Create Ticket");
          }
        } catch (error) {
          console.log(error);
        }
      };

      const handleChange = async (ticketId, value) => {
        try {
          const { data } = await axios.put(`/api/v1/ticket/ticket-status/${ticketId}`, {
            status: value,
          });
          getTickets();
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        if (auth?.token) getTickets();
      }, [auth?.token]);

  return (
    <Layout title={"Tickets"}>
      <div className="row ">
        <div className="col-md-8 dashboard mt-5">
          <h1 className="text-center">All Tickets</h1>
          {tickets?.map((t, i) => {
            return (
              <div className="border shadow mb-3 mt-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Recorder</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">Updated Date</th>
                      <th scope="col">Edit Ticket</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(t._id, value)}
                          defaultValue={t?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{auth?.user?.name}</td>
                      <td>{moment(t?.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                      <td>{moment(t?.updatedAt).format("DD-MM-YYYY HH:mm")}</td>
                      <td>
                        <button
                            className="btn btn-info ms-1"
                            onClick={() => navigate(`/ticket-edit/${t?.slug}`)}
                            >
                                <HiOutlineTicket/>
                            </button>
                      
                      </td>
                    </tr>
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
    </Layout>
  );
};

export default TicketList