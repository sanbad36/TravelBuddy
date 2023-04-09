import express from 'express';
import Razorpay from 'razorpay';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.controller.js';
import { verifyToken } from '../middleware/auth.js';
// import Donation from '../models/Donation.js';

// import emailUtil from '../utils/email.js';
import sendSms from '../utils/sendSms.js';
// const { v4: uuidv4 } = require("uuid")
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import Booking from '../models/Booking.js';
const stripe = new Stripe("sk_test_51MarKISJbAJP59qDH2zYePR5es20RWy8AjFetv6hhamMhKhYQMiUm6bzPVHHvb3llz2DeKtUF02ZSObGpScqsN1Y001cwGbG7H")

const router = express.Router();

/* CREATE */

/* READ */
router.post('/bookings', async(req, res) => {
  try{
    console.log(req.body)
    const {token1, price, user, postId} = req.body
    const customer = await stripe.customers.create({
     email: token1.email,
     source: token1.id
    })
    const payment = await stripe.paymentIntents.create({
     amount: Number(price)*100,
     currency: "INR",
     payment_method: token1.card.id,
     payment_method_types: ['card'],
     confirm: true,
     customer: customer.id,
     receipt_email: token1.email
    },{
        idempotencyKey: uuidv4()
    })
    if(payment.status==='succeeded'){
     const newBooking = new Booking({
         userID: user._id,
         postID: postId,
         BookingAmount: Number(price)*100,
         transactionid: payment.id,
     })
     await newBooking.save()
     res.send("Your Trip Booked Successfully")
    }
    else{
     res.send("Payment Failed")
    }
 }
 catch(error){
   res.status(400).send({
     message: "Something went wrong",
     error: error
   })
 }
})


router.post('/all',async(req,res)=>{
  try{
    console.log(req.body);
    const bookings = await Booking.find({userID: req.body.userid})
    if(bookings){
      res.send({
        message: "Your Bookings Fetched Successfully.",
        data: bookings,
        success: true
      })
    }
    else{
      res.send({
        message: "Your have not booked any trip yet.",
        data: null,
        success: false
      })
    }
  }
  catch(error){
      res.send({
        message: error.message,
        data: error,
        success: false
      })
  }
})

// router.post('/donate', async (req, res) => {
//   try {
//     var instance = new Razorpay({ key_id: 'rzp_test_1IkOpMKeFdcQT0', key_secret: 'NqhXgdMmErxv8NkIWi4sQH8m' });

//     console.log(req.body);
//     const { amount } = req.body;

//     const donation = await Donation.create({ amount, userId: '63eec3b630a0f640351497ea' });

//     const op = await instance.orders.create({
//       amount: 240000,
//       currency: 'INR',
//       receipt: `Thank you for your donation of Rs.2400`
//     });

//     const emailUtil1 = await emailUtil.sendEmail({
//       email: 'adityaganji889@gmail.com',
//       subject: 'Thank you for your donation of Rs.2400',
//       html: '<h1>We are grateful for your donation of Rs.2400.</h1> <p>Your donation will help us to continue our work in providing support for army of our country. </p><p>We will send you a receipt for your donation.</p> Thank you for your support.'
//     });

//     const smsUtil = await sendSms({
//       to: '+9082195422',
//       body: 'Your donation of Rs.2400 has been received. Thank you for your support. We will send you a receipt for your donation. Thank you for your support.'
//     });

//     res.status(201).json({ op });
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// });

// router.get("/:userId/posts", getUserBlogs);

// /* UPDATE */
// router.patch("/:id/like", likePost);

export default router;
