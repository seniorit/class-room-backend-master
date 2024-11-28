const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const themeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
    },
    img_coach: {
      type: String,
    },
    img_user: {
      type: String,
    },
    bkg_nav: {
      type: String,
    },
    bkg_site: {
      type: String,
    },
    bkg_menu: {
      type: String,
    },
    public: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// add plugin that converts mongoose to json
themeSchema.plugin(toJSON);
themeSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The theme's name
 * @param {ObjectId} [excludeGroupId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
themeSchema.statics.isNameTaken = async function (name, excludeThemeId) {
  const theme = await this.findOne({ name, _id: { $ne: excludeThemeId } });
  return !!theme;
};

/**
 * @typedef class theme
 */
const theme = mongoose.model('Theme', themeSchema);

module.exports = theme;
