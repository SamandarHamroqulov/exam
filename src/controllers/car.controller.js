const { globalError } = require("shokhijakhon-error-handler");
const path = require("path");
const CarModel = require("../models/Car.model");
const CategoryModel = require("../models/Category.model");
const { carValidator } = require("../utils/validators/car.validotor");
const { default: mongoose } = require("mongoose");
module.exports = {
  async CREATE_CAR(req, res) {
    try {
      let newCar = req.body;
      await carValidator.validateAsync(newCar);
      if (req.filename) {
        await req.files.car_image.mv(
          path.join(process.cwd(), "uploads", "car_images", req.filename),
        );
      }

      const category = await CategoryModel.findById(newCar.categoryId);
      if (!category) throw new ClientError("Category not found", 404);

      await CarModel.create({
        car_name: newCar.car_name,
        distance: newCar.distance,
        color: newCar.color,
        production_year: newCar.production_year,
        price: newCar.price,
        gearbox: newCar.gearbox,
        description: newCar.description,
        engine: newCar.engine,
        car_image: `/uploads/car_images/${req.filename}`,
        categoryId: newCar.categoryId,
      });
      return res.json({ message: "Car successfully created", status: 201 });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async GET_CAR(req, res) {
    try {
      const { id } = req.params;

      const car = await CarModel.findById(id).populate(
        "categoryId",
        "name category_image",
      );

      if (!car) throw new ClientError("Car not found", 404);

      return res.json(car);
    } catch (err) {
      return globalError(err, res);
    }
  },
  async GET_CARS(req, res) {
    try {
      const cars = await CarModel.find().populate(
        "categoryId",
        "name category_image",
      );
      return res.json(cars);
    } catch (err) {
      return globalError(err, res);
    }
  },
  async GET_CARS_BY_CATEGORY(req, res) {
    try {
      const { categoryId } = req.params;

      const cars = await CarModel.find({ categoryId })
        .populate("categoryId", "name category_image")
        .sort({ createdAt: -1 });

      return res.json(cars);
    } catch (err) {
      return globalError(err, res);
    }
  },
  async UPDATE_CAR(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!mongoose.Types.ObjectId.isValid(id))
        throw new ClientError("Invalid car id", 400);

      const car = await CarModel.findById(id);
      if (!car) throw new ClientError("Car not found", 404);

      if (data.categoryId) {
        const category = await CategoryModel.findById(data.categoryId);
        if (!category) throw new ClientError("Category not found", 404);
      }

      await CarModel.updateOne(
        { _id: id },
        {
          car_name: data.car_name,
          color: data.color,
          production_year: data.production_year
            ? data.production_year
            : car.production_year,
          price: data.price ? data.price : car.price,
          distance: data.distance ? data.distance : car.distance,
          gearbox: data.gearbox,
          engine: data.engine,
          description: data.description,
          categoryId: data.categoryId || car.categoryId,
        },
      );

      return res.json({
        message: "Car updated successfully",
        status: 200,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },

  async DELETE_CAR(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id))
        throw new ClientError("Invalid car id", 400);

      const car = await CarModel.findById(id);
      if (!car) throw new ClientError("Car not found", 404);

      await CarModel.deleteOne({ _id: id });

      return res.json({
        message: "Car deleted successfully",
        status: 200,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },
};
