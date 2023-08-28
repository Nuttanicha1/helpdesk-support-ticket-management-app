import React, { useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';


const CreateTicket = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [auth] = useAuth("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const ticketData = new FormData();
      ticketData.append("title", title);
      ticketData.append("description", description);
      ticketData.append("contact", contact);
      const { data } = axios.post(
        "/api/v1/ticket/create-ticket",
        ticketData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else if (! auth?.token) {
        toast.error("Please Login Before Create Ticket");
      } else {
        toast.success("Ticket Created Successfully");
      }
    } catch (error) {
      // console.log(error);
      toast.error("something went wrong");
    }
  };


  return (
    <Layout title={"Ticket Manage"}>
        <div className="ticket">
          <div className="create">
            <h2>Create Ticket</h2>
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
                <button className="crebtn" onClick={handleCreate}>
                  CREATE TICKET
                </button>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default CreateTicket;