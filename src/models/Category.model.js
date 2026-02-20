const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category_image: {
      type: String,
    },
  },

  { versionKey: false, timestamps: true },
);

module.exports = model("Category", CategorySchema);
