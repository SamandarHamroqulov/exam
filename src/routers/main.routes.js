const { Router } = require("express");
const categoryRouter = require("./category.routes");
const authRouter = require("./auth.routes");
const authGuard = require("../guards/auth.guard");
const carRouter = require("./car.routes");
const mainRouter = Router()
mainRouter.use("/auth", authRouter)
mainRouter.use(authGuard)
mainRouter.use("/category", categoryRouter)
mainRouter.use("/car", carRouter)
module.exports = mainRouter