const { Categories } = require("../models");

class CategoriesController {
  static async addCategory(req, res) {
    try {
      const { categoryName } = req.body;

      const cekCategory = await Categories.findOne({
        where: {
          category_name: categoryName,
        },
      });

      if (cekCategory) {
        res.json({
          message: `Category with category name ${categoryName} already inserted!`,
        });
      } else {
        await Categories.create({
          category_name: categoryName,
        });

        res.json({
          message: "Add category successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getCategories(req, res) {
    try {
      const datas = await Categories.findAll();

      if (datas.length > 0) {
        res.json({
          message: "Get all category successfully!",
          datas: datas
        });
      } else {
        res.json({
          message: "Category data list is empty!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getCategoryById(req, res) {
    try {
      const id = req.params.id;

      const datas = await Categories.findOne({
        where: {
          id: id,
        },
      });

      if (datas) {
        res.json({
          message: `Get category with id ${id} successfully!`,
          datas: datas,
        });
      } else {
        res.json({
          message: `Category with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id, categoryName } = req.body;

      const cekCategory = await Categories.findOne({
        where: {
          id: id,
        },
      });

      if (cekCategory) {
        await Categories.update(
          {
            category_name: categoryName,
          },
          {
            where: {
              id: id,
            },
          }
        );

        res.json({
          message: `Update category with id ${id} successfully!`
        })
      } else {
        res.json({
          message: `Category with id ${id} not found!`
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteCategory(req, res) {
    try {
      const id = req.params.id;

      const cekCategory = await Categories.findOne({
        where: {
          id: id
        }
      })

      if (cekCategory) {
        await Categories.destroy({
          where: {
            id: id
          }
        })

        res.json({
          message: `Delete category with id ${id} successfully!`
        })
      } else {
        res.json({
          message : `Category with id ${id} successfully!`
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CategoriesController;
