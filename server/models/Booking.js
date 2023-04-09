import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postID: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    BookingAmount: {
        type: Number,
        required: true
    },
    transactionid: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Booking = mongoose.model('Booking',bookingSchema)
export default Booking;