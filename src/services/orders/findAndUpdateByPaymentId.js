const OrderModel = require("../../models/order");
const PaymentLog = require("../payments/");
const EnrollmentService = require("../../services/enrollment");
const ScheduleService = require("../../services/schedules");
const StudentService = require("../../services/students");

module.exports = async (paymentData) => {
  try {
    const { id } = paymentData;
    const update = {
      status: paymentData.payment_status,
    };

    const order = await OrderModel.findOneAndUpdate({ paymentId: id }, update, {
      new: true,
    });

    if (!order) {
      throw { statusCode: 404, message: "Order not found" };
    }

    try {
      await PaymentLog.save(paymentData);
    } catch (error) {
      console.error("Error saving payment log:", error);
      throw {
        statusCode: 500,
        message: "Failed to save payment log. Order update may be reverted.",
      };
    }

    const classSchedules = order.classSchedules;
    const enrollmentPromises = classSchedules.flatMap((data) =>
      data.students.map(async (student) => {
        const enrollmentCreated = await EnrollmentService.create({
          order: order._id,
          student: student,
          classSchedule: data.classSchedule,
          status: paymentData.payment_status,
        });

        await Promise.all([
          StudentService.addEnrollment(enrollmentCreated.id, student),
          ScheduleService.addEnrollment(enrollmentCreated.id, data.classSchedule),
        ]);

        return enrollmentCreated;
      })
    );

    await Promise.all(enrollmentPromises);

    return order;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw { statusCode: 500, message: "Failed to update order" };
  }
};
