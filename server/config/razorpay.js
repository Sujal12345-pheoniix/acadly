const Razorpay = require("razorpay");

const keyId = process.env.RAZORPAY_KEY;
const keySecret = process.env.RAZORPAY_SECRET;

let instance = null;

if (keyId && keySecret) {
    instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    });
} else {
    console.warn("Razorpay keys are missing. Payment endpoints are disabled until configured.");
}

exports.instance = instance;