const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

//UserProfile
const userProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isPostalCode(value, 'US')) {
          throw new Error('Invalid postal code');
        }
      },
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      number: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
          if (!validator.isMobilePhone(value, 'any')) {
            throw new Error('Invalid phone number');
          }
        },
      },
      countryCode: {
        type: String,
        required: true,
      },
    },
    picture: {
      type: String
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      enum: ['male', 'female', 'other'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }, // Ensure virtuals are included when converting to JSON
    toObject: { virtuals: true }, // Ensure virtuals are included when converting to Object
  }
);

// add plugin that converts mongoose to json
userProfileSchema.plugin(toJSON);
userProfileSchema.plugin(paginate);


// Create a virtual field for fullName
userProfileSchema.virtual('fullName').get(function () {
  return `${this.firstname} ${this.lastname}`;
});


/**
 * Check if email is taken
 * @param {string} email - The userProfile's email
 * @param {ObjectId} [excludeUserProfileId] - The id of the userProfile to be excluded
 * @returns {Promise<boolean>}
 */
userProfileSchema.statics.isPhoneTaken = async function (phone, excludeUserProfileId) {
  const userProfile = await this.findOne({ phone, _id: { $ne: excludeUserProfileId } });
  return !!userProfile;
};

/**
 * @typedef UserProfile
 */
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
