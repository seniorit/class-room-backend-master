const Joi = require('joi')
const { objectId } = require('./custom.validation')

const getAll = {
  query: Joi.object().keys({
    classActivity: Joi.string().custom(objectId),
    coaches: Joi.array().items(Joi.string().custom(objectId)),
    public: Joi.boolean(),
    slots: Joi.number(),
    recurring: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
    scheduled: Joi.array().items({
      day: Joi.string()
        .valid(
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        )
    }),
    validityTime: Joi.object().keys({
      startDate: Joi.date(),
      endDate: Joi.date(),
    }),
  })
}

const getId = {
  params: Joi.object().keys({
    classScheduleId: Joi.string().custom(objectId)
  })
}

const create = {
  body: Joi.object().keys({
    classActivity: Joi.string().required().custom(objectId),
    coaches: Joi.array().items(Joi.string().custom(objectId)).min(1).required(),
    public: Joi.boolean().required(),
    slots: Joi.number().required(),
    recurring: Joi.boolean().required(),
    scheduled: Joi.array()
      .items({
        day: Joi.string()
          .valid(
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          )
          .required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
      })
      .min(1),
    validityTime: Joi.object().keys({
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    }),
  }),
};


const update = {
  params: Joi.object().keys({
    classScheduleId: Joi.string().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      classActivity: Joi.string().required().custom(objectId),
      coaches: Joi.array().items(Joi.string().custom(objectId)),
      public: Joi.boolean(),
      slots: Joi.number().required(),
      recurring: Joi.boolean().required(),
      scheduled: Joi.array().items({
        day: Joi.string()
          .valid(
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          )
          .required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required()
      }),
      validityTime: Joi.object().keys({
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
      }),
    })
    .min(1)
}

const destroy = {
  params: Joi.object().keys({
    classScheduleId: Joi.string().custom(objectId)
  })
}

module.exports = {
  getAll,
  getId,
  create,
  update,
  destroy
}
