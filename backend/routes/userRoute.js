const express = require(`express`);
const router = express.Router();

const {newUser,getAllUsers,updateUser,deleteUser, getUser} = require(`../controllers/userController`)
const {isAuthenticatedUser,authorizeRoles} = require(`../middleware/auth`)

router.route('/admin/user/new').post(isAuthenticatedUser,newUser);
router.route('/admin/users').get(isAuthenticatedUser,getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,getUser);
router.route(`/admin/user/:id`).put(isAuthenticatedUser, updateUser).delete(isAuthenticatedUser, deleteUser);

module.exports = router;