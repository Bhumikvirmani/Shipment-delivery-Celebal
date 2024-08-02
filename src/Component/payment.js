// import Razorpay from 'razorpay';

// console.log('crypto:', crypto);
// const razorpay = new Razorpay({
//   key_id: '<KEY_ID>',
//   key_secret: '<KEY_SECRET>',
// });

// const createOrder = async (amount) => {
//   try {
//     const order = await razorpay.orders.create({
//       amount,
//       currency: 'INR',
//       payment_capture: 1,
//     });
//     return order.id;
//   } catch (error) {
//     console.error('Error creating order:', error);
//   }
// };

// const verifyPayment = async (orderId, paymentId) => {
//   try {
//     const payment = await razorpay.payments.fetch(paymentId);
//     if (payment.status === 'captured') {
//       // Payment successful
//     } else {
//       // Payment failed
//     }
//   } catch (error) {
//     console.error('Error verifying payment:', error);
//   }
// };

// export { createOrder, verifyPayment };

// import { Razorpay } from 'razorpay';
// import crypto from 'crypto';

// const razorpay = new Razorpay({
//   key_id: '<KEY_ID>',
//   key_secret: '<KEY_SECRET>',
// });

// const createOrder = async (amount) => {
//   try {
//     const order = await razorpay.orders.create({
//       amount,
//       currency: 'INR',
//       payment_capture: 1,
//     });
//     return order.id;
//   } catch (error) {
//     console.error('Error creating order:', error);
//   }
// };

// const verifyPayment = async (orderId, paymentId) => {
//   try {
//     const payment = await razorpay.payments.fetch(paymentId);
//     if (payment.status === 'captured') {
//       // Payment successful
//     } else {
//       // Payment failed
//     }
//   } catch (error) {
//     console.error('Error verifying payment:', error);
//   }
// };

// export { createOrder, verifyPayment };