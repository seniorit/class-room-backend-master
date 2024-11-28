const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { string } = require("joi");

const orderSchema = mongoose.Schema(
  {
    orderCode: {
      type: String,
      unique: true,
      require: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      lowercase: true,
      enum: ["pending", "open", "error", "partial", "completed", "cancelled"],
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    preOrder: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "PreOrder",
    },
    classSchedules: [
      {
        classSchedule: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "ClassSchedule",
        },
        students: [
          {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Student",
          },
        ],
      },
    ],

    deleted: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      default: "USD",
    },
    paymentId: {
      type: String,
    },
    paymentLink: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef orderSchema
 */

module.exports = mongoose.model("order", orderSchema);
