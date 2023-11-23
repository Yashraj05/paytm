import express from 'express';
import paymentInitiationRouter from './paymentInitiation.js';
import paymentResponseRouter from './paymentResponse.js';

const app = express();

// Use routers
app.use('/api/payment', paymentInitiationRouter);
app.use('/api/payment', paymentResponseRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
