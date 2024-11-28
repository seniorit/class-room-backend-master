const Joi = require("joi");
const { objectId, regValidName } = require("./custom.validation");

const getStudents = {
  query: Joi.object().keys({
    firstname: Joi.object().regex(regValidName).max(30),
    birthday: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string()
  }),
};

const getStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

const createStudent = {
  body: Joi.object().keys({
    guard: Joi.string().custom(objectId).required(),
    firstName: Joi.string().regex(regValidName).max(30).required(),
    lastName: Joi.string().regex(regValidName).max(30).required(),
    birthday: Joi.date().required(),
    note: Joi.string(),
    gender: Joi.string().required(),
    picture: Joi.string(),
    classifications: Joi.array().items(objectId),
  }),
};

const getStudentsByGuardId = {
  params: Joi.object().keys({
    guardId: Joi.string().custom(objectId),
  }),
};

const getByClassificationId = {
  params: Joi.object().keys({
    classificationId: Joi.string().custom(objectId),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      guard: Joi.string().custom(objectId).required(),
      firstName: Joi.string().regex(regValidName).max(30).required(),
      lastName: Joi.string().regex(regValidName).max(30).required(),
      birthday: Joi.date().required(),
      gender: Joi.string().required(),
      note: Joi.string(),
      picture: Joi.string(),
      classifications: Joi.array().items(objectId),
    })
    .min(1),
};

const deleteStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getStudents,
  getStudent,
  getStudentsByGuardId,
  createStudent,
  updateStudent,
  deleteStudent,
};
