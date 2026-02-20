const { globalError, ClientError } = require("shokhijakhon-error-handler");
const { categroyValidator } = require("../utils/validators/car.validotor");const path = require("path");
const CategoryModel = require("../models/Category.model");
module.exports = {
  async CREATE_CATEGORY(req, res) {
    try {
      const newCategory = req.body;
      await categroyValidator.validateAsync(newCategory);
      if (req.filename) {
        console.log(req.files.category_image);

        await req.files.category_image.mv(
          path.join(process.cwd(), "uploads", "category_images", req.filename),
        );
      }
      await CategoryModel.create({
        ...newCategory,
        category_image: req.filename,
      });
      return res.json({ messgae: "Category succesfully created", status: 201 });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async GET_CATEGORY(req, res) {
    try {
      let { id } = req.params;
      if (id) {
        let findCategory = await CategoryModel.findById(id);
        if (!findCategory) throw new ClientError("Category not found", 404);
        return res.json(findCategory);
      }
      let categories = await CategoryModel.find();
      return res.json(categories);
    } catch (err) {
      return globalError(err, res);
    }
  },
  async UPDATE_CATEGORY(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const category = await CategoryModel.findById(id);
      if (!category) throw new ClientError("Category not found", 404);

      const name = String(data.name).trim();

      const exists = await CategoryModel.findOne({ name, _id: { $ne: id } });
      if (exists) throw new ClientError("Category already exists", 400);

      await CategoryModel.updateOne({ _id: id }, { $set: { name } });

      return res.json({
        message: "Category updated successfully",
        status: 200,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },
async DELETE_CATEGORY(req, res) {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) throw new ClientError("Category not found", 404);
    await CarModel.deleteMany({ categoryId: id });
    await CategoryModel.deleteOne({ _id: id });
    return res.json({ message: "Category and related cars deleted", status: 200 });
  } catch (err) {
    return globalError(err, res);
  }
}
};
