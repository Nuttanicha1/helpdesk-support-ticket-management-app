import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Form from 'react-bootstrap/Form';
import Spiner from "../components/Layout/Spiner.js"
import Dropdown from 'react-bootstrap/Dropdown';
import { gettickets } from '../components/Action/allApi';
import Table from './Table';

const HomePage = () => {

  const [showspin] = useState(false);
  const [status, setStatus] = useState("All");
  const [sort,setSort] = useState("new,first");
  const [tickets, setTickets] = useState([]);

  const getTickets = async()=>{
    const response = await gettickets(status,sort);
    if(response.status === 200){
      setTickets(response.data.tickets);
    }else{
      console.log("Error for get ticket data")
    }
  }

  useEffect(() => {
    getTickets();
  }, [status,sort]);

  return (
    <Layout title={"Ticket Manage"}>
      <div className="home mt-4">

      {/* sort by Updated Date */}
      <div className="filter">
        <h3>Sort By Updated Date</h3>
          <Dropdown className='mx-4 mb-3'>
            <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
              <i class="fa-solid fa-sort"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={()=>setSort("new")}>New to Old</Dropdown.Item>
              <Dropdown.Item onClick={()=>setSort("old")}>Old to New</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </div>

      {/* sort by status */}
      <div className="filter">
              <h3>Sort By Status</h3>
              <Dropdown className='mx-4 mb-3'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={()=>setSort("first")}>First to Last</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setSort("last")}>Last to First</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
      </div>

      {/* filter by status */}
        <div className="filter">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    className="mt-2 mx-4"
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e)=>setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    className="mt-2 mx-4"
                    type={"radio"}
                    label={`Pending`}
                    name="status"
                    value={"Pending"}
                    onChange={(e)=>setStatus(e.target.value)}
                  />
                  <Form.Check
                    className="mt-2 mx-4"
                    type={"radio"}
                    label={`Accepted`}
                    name="status"
                    value={"Accepted"}
                    onChange={(e)=>setStatus(e.target.value)}
                  />
                  <Form.Check
                    className="mt-2 mx-4"
                    type={"radio"}
                    label={`Resolved`}
                    name="status"
                    value={"Resolved"}
                    onChange={(e)=>setStatus(e.target.value)}
                  />
                  <Form.Check
                    className="mt-2 mx-4"
                    type={"radio"}
                    label={`Rejected`}
                    name="status"
                    value={"Rejected"}
                    onChange={(e)=>setStatus(e.target.value)}
                  />
                </div>
              </div>
        </div>

        {
          showspin ? <Spiner /> : <Table
                                    tickets={tickets}
                                    getTickets={getTickets}
                                  />
        }
      </div>
      
    </Layout>
  );
};

export default HomePage;