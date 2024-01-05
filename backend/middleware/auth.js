const Admin = require(`../module/admin`);
const jwt = require(`jsonwebtoken`);
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

//Checks if admin is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors( async (req,res,next) => {
  
  const {token} = req.cookies

  if(!token){
    return next(new ErrorHandler('Login first to access this resource.', 401))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.admin = await Admin.findById(decoded.id);

  next()

})


//Handling users roles
exports.authorizeRoles = (...roles) => {
  return (req,res,next) => {
    if(!roles.includes(req.admin.role)){
      return next(
      new ErrorHandler(`Role (${req.admin.role}) is not allowed to access this resource`,
      403))
    }
    next()
  }
}