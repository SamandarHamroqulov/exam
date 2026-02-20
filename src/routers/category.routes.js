const { Router } = require("express");
const categoryController = require("../controllers/category.controller");
const adminGuard = require("../guards/admin.guard");
const authGuard = require("../guards/auth.guard");
const categoryPhotGuard = require("../guards/category-phot.guard");
const categoryRouter = Router()
categoryRouter.post("/create",authGuard,adminGuard,categoryPhotGuard,categoryController.CREATE_CATEGORY );
categoryRouter.get("/all", categoryController.GET_CATEGORY)
categoryRouter.get("/:id", categoryController.GET_CATEGORY)
categoryRouter.put("/update/:id", authGuard, adminGuard, categoryController.UPDATE_CATEGORY)
module.exports = categoryRouter