const PaymentLogModel = require("../../models/paymentsLog");

module.exports = async (log) => {
  try {
    const paymentLog = new PaymentLogModel({
      log: JSON.stringify(log),
    });

    await paymentLog.save();
    console.log('Payment log saved successfully');
  } catch (error) {
    console.error('Error saving payment log:', error);
    throw error;
  }
}
