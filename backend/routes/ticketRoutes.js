import express from "express";
import {
    createTicketController,
    getTicketController,
    getSingleTicketController,
    updateTicketController,
    ticketStatusController,
    getSortFilterController
} from "./../controller/ticketController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-ticket",
  requireSignIn,
  formidable(),
  createTicketController
);
//routes
router.put(
  "/update-ticket/:tid",
  requireSignIn,
  formidable(),
  updateTicketController
);

//get tickets
router.get("/get-ticket", getTicketController);

//single ticket
router.get("/get-ticket/:slug", getSingleTicketController);

//filter post
router.get("/ticket-filters", getSortFilterController);

// ticket status update
router.put(
  "/ticket-status/:ticketId",
  requireSignIn,
  ticketStatusController
);

export default router;