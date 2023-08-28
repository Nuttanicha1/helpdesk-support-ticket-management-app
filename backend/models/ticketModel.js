import mongoose from "mongoose";
const ticketSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        trim: true,
        validate: /^[ A-Za-z0-9 ]*$/
    },
    slug: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        require: true
    },
    contact:{
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Accepted", "Resolved", "Rejected"],
    },

}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema)