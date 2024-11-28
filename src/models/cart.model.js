const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const product = require("../services/product");
const { type } = require("../validations/cart/add");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    classSchedules: [
      {
        _id: false,
        ClassSchedule: {
          type: Schema.Types.ObjectId,
          ref: "ClassSchedule",
          required: true,
        },
        slots: {
          type: Number,
          required: true,
        },
        students: [{
          type: Schema.Types.ObjectId,
          ref: "Student",
          require: true
        }]
      },
    ],
    products: [
      {
        _id: false,
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: {
          type: Number,
        }
      }
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

cartSchema.plugin(toJSON);
cartSchema.plugin(paginate);

module.exports = mongoose.model("Cart", cartSchema);
