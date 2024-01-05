const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require(`../module/user`);
const ErrorHandler = require("../utils/errorHandler");
const APIFeatures = require(`../utils/apiFeatures`)

//Create a new user => /mindful/admin/user/new

exports.newUser = async(req,res,next) => {
    const {
        name,
        email,
        phone
    } = req.body;

    const user = await User.create({
        name,
        email,
        phone,
        admin: req.admin._id
    })

    res.status(200).json({
        success: true,
        user
    })
}

//Get All user = /mindful/users/me
exports.getAllUsers = catchAsyncErrors(async(req,res,next) => {
    let sortOrder;
    if(req.query.sort === 'Z-A'){
         sortOrder = -1
    }else if(req.query.sort === 'A-Z'){
         sortOrder = 1
    }else{
        sortOrder =1
    }
    const apiFeatures  = new APIFeatures(User.find({admin: req.admin.id}).sort({ name: sortOrder }), req.query).search()
    const user = await apiFeatures.query;
  
    if(!user){
        return(new ErrorHandler(`No Data Found`,404))
    }

    res.status(200).json({
        success: true,
        user
    })
})


//Update user = /mindful/users/:id
exports.updateUser = catchAsyncErrors(async(req,res,next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        useFindModify: false
    })
    res.status(200).json({
        success: true
    })

})

//Delete user =>  /mindful/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
    })
})

//Get Single user =>  /mindful/admin/user/:id
exports.getUser = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})