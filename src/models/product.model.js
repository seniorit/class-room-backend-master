const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
    },
    public: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    picture: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    stripe: {
      type: {}
    }
  },
  { 
    timestamps: true,
    versionKey: false,
   }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The user's name
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
productSchema.statics.isCodeTaken = async function (code, excludeProductId) {
  const product = await this.findOne({ code, _id: { $ne: excludeProductId } });
  return !!product;
};

/**
 * @param {string} code
 * @returns
 */
productSchema.statics.isCodeTakenSave = async function (code) {
  const product = await this.findOne({ code });
  return !!product;
};

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;