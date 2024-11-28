const ScheduleModel = require('../../models/classSchedule.model')

module.exports = async (enrollment, id)=>{
    return await ScheduleModel.updateOne(
      { _id: id },
      { $push: { enrollments: enrollment } }
    );
}