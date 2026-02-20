const { Router } = require("express");
const authGuard = require("../guards/auth.guard");
const carPhotoGuard = require("../guards/car-photo.guard");
const carController = require("../controllers/car.controller");

const carRouter = Router();

carRouter.post("/create", authGuard, carPhotoGuard, carController.CREATE_CAR);

carRouter.get("/all", authGuard, carController.GET_CARS);
carRouter.get(
  "/category/:categoryId",
  authGuard,
  carController.GET_CARS_BY_CATEGORY,
);

carRouter.get("/:id", authGuard, carController.GET_CAR);
carRouter.put("/:id", authGuard, carController.UPDATE_CAR);
carRouter.delete("/:id", authGuard, carController.DELETE_CAR);

module.exports = carRouter;
