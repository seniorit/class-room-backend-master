const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const preOrderSchema = mongoose.Schema(
  {
    orderCode: {
      type: String,
      unique: true,
      require: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
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
    cart: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Cart",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      default: "USD",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
preOrderSchema.plugin(toJSON);
preOrderSchema.plugin(paginate);

/**
 * @typedef PreOrderSchema
 */
const PreOrder = mongoose.model("PreOrder", preOrderSchema);

module.exports = PreOrder;
