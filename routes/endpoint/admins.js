const router = require("express").Router();
const AdminsController = require("../../controller/AdminsController");
const { authentication } = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");

router.post("/register", upload.single("profilPhoto"), AdminsController.register);
router.post("/login", AdminsController.login);
router.get("/admins", authentication, AdminsController.getAdmins);
router.get("/admins/:id", authentication, AdminsController.getAdminById);
router.put("/admins", authentication, AdminsController.updateAdmin);
router.delete("/admins/:id", authentication, AdminsController.deleteAdmin);

module.exports = router;
