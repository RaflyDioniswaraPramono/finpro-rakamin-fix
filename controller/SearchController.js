const {
  Admins,
  Roles,
  Products,
  Categories,
  StockTypes,
  Suppliers,
  Distributors,
  SupplierReports,
  DistributorReports,  
} = require("../models");
const { Op } = require("sequelize");

class SearchController {
  static async SearchAdmins(req, res) {
    try {
      const { keywords } = req.body;

      const datas = await Admins.findAll({
        include: [{ model: Roles }],
        where: {
          [Op.or]: {
            admin_name: {
              [Op.like]: `%${keywords}%`,
            },            
            email: {
              [Op.like]: `%${keywords}%`,
            },
            username: {
              [Op.like]: `%${keywords}%`,
            },
            description: {
              [Op.like]: `%${keywords}%`,
            },
          },
        },
      });

      res.json({
        datas: datas,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async SearchProducts(req, res) {
    try {
      const { keywords } = req.body;

      const datas = await Products.findAll({
        include: [{ model: Categories }, { model: StockTypes }],
        where: {
          [Op.or]: {
            product_name: {
              [Op.like]: `%${keywords}%`,
            },
            product_price: {
              [Op.like]: `%${keywords}%`,
            },
          },
        },
      });

      res.json({
        datas: datas,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async SearchSuppliers(req, res) {
    try {
      const { keywords } = req.body;

      const datas = await Suppliers.findAll({
        where: {
          [Op.or]: {
            supplier_name: {
              [Op.like]: `%${keywords}%`,
            },
            supplier_address: {
              [Op.like]: `%${keywords}%`,
            },
          },
        },
      });

      res.json({
        datas: datas,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async SearchDistributors(req, res) {
    try {
      const { keywords } = req.body;

      const datas = await Distributors.findAll({
        where: {
          [Op.or]: {
            distributor_name: {
              [Op.like]: `%${keywords}%`,
            },
            distributor_address: {
              [Op.like]: `%${keywords}%`,
            },
          },
        },
      });

      res.json({
        datas: datas,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async ShortSupplierReports(req, res) {
    try {      
      const { shortType } = req.body;

      const datas = await SupplierReports.findAll({        
        include: [{ model: Suppliers }, { model: Products }],
        order: [["id", `${shortType}`]],
      });

      if (datas.length > 0) {
        res.json({
          message: "Get all supplier report successfully!",
          datas: datas,
        });
      } else {
        res.json({
          message: "Supplier data list is empty!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async ShortDistributorReports(req, res) {
    try {      
      const { shortType } = req.body;

      const datas = await DistributorReports.findAll({        
        include: [{ model: Distributors }, { model: Products }],
        order: [["id", `${shortType}`]],
      });

      if (datas.length > 0) {
        res.json({
          message: "Get all supplier report successfully!",
          datas: datas,
        });
      } else {
        res.json({
          message: "Supplier data list is empty!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async SearchCategories(req, res) {
    try {
      const { keywords } = req.body;

      const datas = await Categories.findAll({        
        where: {
          [Op.or]: {
            category_name: {
              [Op.like]: `%${keywords}%`,
            },            
          },
        },
      });

      res.json({
        datas: datas,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static async SearchStockTypes(req, res) {
    try {
      const { keywords } = req.body;

      const datas = await StockTypes.findAll({
        where: {
          [Op.or]: {
            stock_type: {
              [Op.like]: `%${keywords}%`,
            },            
          },
        },
      });

      res.json({
        datas: datas,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = SearchController;
