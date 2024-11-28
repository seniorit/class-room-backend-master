const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const newSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    date: {
      type: Date,
      required: true
    },
    image: {
      type: String
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User'
    },
    public: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// add plugin that converts mongoose to json
newSchema.plugin(toJSON)
newSchema.plugin(paginate)

/**
 * @typedef New
 */
const News = mongoose.model('News', newSchema)

module.exports = News
