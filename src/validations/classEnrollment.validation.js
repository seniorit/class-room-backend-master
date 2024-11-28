const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getAll = {
  query: Joi.object().keys({
    text: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getId = {
  params: Joi.object().keys({
    classEnrollmentId: Joi.string().custom(objectId),
  }),
};

const create = {
  body: Joi.object().keys({
    students: Joi.array().items(Joi.string().custom(objectId)).min(1).required(),
    classSchedule: Joi.string().custom(objectId).required(),
    status: Joi.string(),
  }),
};

const update = {
  params: Joi.object().keys({
    classEnrollmentId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      student: Joi.string().custom(objectId).required(),
      classSchedule: Joi.string().custom(objectId).required(),
      enrollmentDate: Joi.date().required(),
      activityDates: Joi.object().keys({
        date: Joi.date().required(),
        state: Joi.date().required(),
      }),
      status: Joi.string().required(),
    })
    .min(1),
};

const destroy = {
  params: Joi.object().keys({
    classEnrollmentId: Joi.string().custom(objectId)
  })
}

module.exports = {
  getAll,
  getId,
  create,
  update,
  destroy
};
