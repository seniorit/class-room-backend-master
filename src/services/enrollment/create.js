const EnrollmentModel = require("../../models/classEnrollment.model");

module.exports = async (enrollment) => {
  try {
    // Primero, intentamos encontrar una inscripción existente
    const existingEnrollment = await EnrollmentModel.findOne({
      student: enrollment.student,
      classSchedule: enrollment.classSchedule
    });

    if (existingEnrollment) {
      console.log("Duplicate enrollment detected, updating existing entry.");
      // Si existe, actualizamos la fecha de inscripción y otros campos si es necesario
      existingEnrollment.enrollmentDate = new Date();
      existingEnrollment.status = enrollment.status;
      existingEnrollment.order = enrollment.order;
      await existingEnrollment.save();
      return existingEnrollment;
    } else {
      // Si no existe, creamos una nueva inscripción
      const enrollmentCreated = await EnrollmentModel.create(enrollment);
      return enrollmentCreated;
    }
  } catch (error) {
    console.error("Error in enrollment creation:", error);
    throw new Error(
      `Unable to create or update enrollment: ${error.message}. Please ensure that the class schedule, student, and order are valid.`
    );
  }
};
