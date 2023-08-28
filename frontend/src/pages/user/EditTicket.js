import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import Layout from '../../components/Layout/Layout';
import { useParams } from "react-router-dom";

const EditTicket = () => {

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("");
  const params = useParams();
  

  //get single ticket
  const getSingleTicket = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/ticket/get-ticket/${params.slug}`
      );
      setTitle(data.ticket.title);
      setId(data.ticket._id);
      setDescription(data.ticket.description);
      setContact(data.ticket.contact);
      setStatus(data.ticket.status);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleTicket();
  }, []);

  //update ticket function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const ticketData = new FormData();
      ticketData.append("title", title);
      ticketData.append("description", description);
      ticketData.append("contact", contact);
      ticketData.append("status", status);
      const { data } = axios.put(
        `/api/v1/ticket/update-ticket/${id}`,
        ticketData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Ticket Updated Successfully");
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    }
  };

  return (
    <Layout title={"Ticket Manage"}>
        <div className="ticket">
          <div className="create">
            <h2>Edit Ticket</h2>
            <div>
              <div className="mb-3">
              <label className="label"><b>Title</b></label>
                <input
                  type="text"
                  value={title}
                  placeholder="write a title"
                  className="form-control"
                  size="70"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
              <label className="label"><b>Description</b></label>
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
              <label className="label"><b>Contact</b></label>
              <input
                  type="text"
                  value={contact}
                  placeholder="write a contact"
                  className="form-control"
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button className="crebtn" onClick={handleUpdate}>
                  UPDATE TICKET
                </button>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default EditTicket;