const express = require(`express`);
const router = express.Router();

const {getAdmin,newAdmin, loginAdmin,logoutAdmin} = require(`../controllers/adminController`);

router.route(`/admins`).get(getAdmin);
router.route('/admin/new').post(newAdmin);
router.route('/login').post(loginAdmin);
router.route('/logout').get(logoutAdmin);

module.exports = router;