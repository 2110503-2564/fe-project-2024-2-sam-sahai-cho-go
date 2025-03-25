import { models } from "mongoose";

const mongoose = require('mongoose');

const ReservationSchema=new mongoose.Schema({
    apptDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    dentist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dentist',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Reservation = models.Reservation || mongoose.model("Reservation", ReservationSchema);
export default Reservation;