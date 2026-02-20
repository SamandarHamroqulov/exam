const { Schema, model } = require("mongoose");

const carSchema = new Schema(
  {
    car_name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    car_image: {
      type: String,
      required: true,
    },
    production_year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    distance: {
      type: Number,
    },
    gearbox: {
      type: String,
    },
    engine: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
module.exports = model("Car", carSchema);
