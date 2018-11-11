console.log("keys are loaded");
exports.coinpayment = {
  key: process.env.COINPAYMENT_PUBLIC_KEY,
  secret: process.env.COINPAYMENT_PRIVATE_KEY
};

exports.sendgrid = process.env.SENDGRID_API_KEY;

exports.JWT_SECRET = process.env.JWT_SECRET;