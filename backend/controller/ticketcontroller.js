import ticketModel from "../models/ticketModel.js";
import slugify from "slugify";
import dotenv from "dotenv";

dotenv.config();

export const createTicketController = async (req, res) => {
  try {
    const { title, description, contact } =
      req.fields;
    //validation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !contact:
        return res.status(500).send({ error: "Contact is Required" });
    }

    const tickets = new ticketModel({ ...req.fields, slug: slugify(title) });
    
    await tickets.save();
    res.status(201).send({
      success: true,
      message: "Ticket Created Successfully",
      tickets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating ticket",
    });
  }
};

//get all tickets
export const getTicketController = async (req, res) => {
  try {
    
    const tickets = await ticketModel
      .find({})
      .populate("status")
      .sort({ status: 1 , updatedAt: -1 });

      res.status(200).send({
      success: true,
      counTotal: tickets.length,
      message: "All Tickets ",
      tickets,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting tickets",
      error: error.message,
    });
  }
};

//get all tickets with sort && filter
export const getSortFilterController = async (req, res) => {
  
  const search = req.query.search || ""
  const status = req.query.status || "";
  const sort = req.query.sort || "";
  const query = {
    title: { $regex: search, $options: "i" }
  }
  
  if (status !== "All") {
    query.status = status
  }

  try {
    
    const tickets = await ticketModel
      .find(query)
      .sort({ updatedAt: sort == "new" ? -1 : 1 , status: sort == "first" ? 1 : -1 });
      
      res.status(200).send({
        success: true,
        counTotal: tickets.length,
        message: "All Tickets ",
        tickets,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting tickets",
      error: error.message,
    });
  }
};
// get single ticket
export const getSingleTicketController = async (req, res) => {
  try {
    const ticket = await ticketModel
      .findOne({ slug: req.params.slug })
      .populate("status");
    res.status(200).send({
      success: true,
      message: "Single Ticket Fetched",
      ticket,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single ticket",
      error,
    });
  }
};

//update ticket
export const updateTicketController = async (req, res) => {
  try {
    const { title, description, contact, status } =
      req.fields;

    //validation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Title is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !contact:
        return res.status(500).send({ error: "Contact is Required" });
      case !status:
        return res.status(500).send({ error: "Status is Required" });
    }

    const tickets = await ticketModel.findByIdAndUpdate(
      req.params.tid,
      { ...req.fields, slug: slugify(title) },
      { new: true }
    );
    await tickets.save();
    res.status(201).send({
      success: true,
      message: "Ticket Updated Successfully",
      tickets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update ticket",
    });
  }
};

// filters
export const FiltersbyStatusController = async (req, res) => {
  const { status } = req.params;
  
  try {
    const filteredData = await ticketModel.find({ status });
    res.json(filteredData);
  } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        message: "Error While Filtering By Status",
        error,
      });
  }
};

//ticket status
export const ticketStatusController = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;
    const tickets = await ticketModel.findByIdAndUpdate(
      ticketId,
      { status },
      { new: true }
    );
    res.json(tickets);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  }
};