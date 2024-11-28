const ScheduleModel = require('../../models/classSchedule.model')

module.exports = async (schedule) => { 
console.log('breack point')
    return await ScheduleModel.create(schedule);
}