import express from 'express';
import PaytmChecksum from 'paytmchecksum';

const router = express.Router();

const MID = "OUEept11459745037985";
const MKEY = "1Ihx&s#y1St!Dk0m";

router.post('/start_payment', (req, res) => {
    // Your logic to handle payment initiation

    // Sample logic to generate a response with Paytm parameters
    const param_dict = {
        'MID': MID,
        'ORDER_ID': 'YOUR_ORDER_ID',
        'TXN_AMOUNT': '10',
        'CUST_ID': 'CUSTOMER_ID',
        'INDUSTRY_TYPE_ID': 'Retail',
        'WEBSITE': 'WEBSTAGING',
        'CHANNEL_ID': 'WEB',
        'CALLBACK_URL': 'http://localhost:3000/api/payment/handle_payment',
    };

    // Generate checksum using PaytmChecksum library
    PaytmChecksum.generateSignature(JSON.stringify(param_dict), MKEY)
        .then(checksum => {
            param_dict['CHECKSUMHASH'] = checksum;
            // Sending the generated param_dict to the frontend
            res.json({ 'param_dict': param_dict });
        })
        .catch(error => {
            console.error('Error during checksum generation:', error);
            res.status(500).send('Error during checksum generation');
        });
});

export default router;
