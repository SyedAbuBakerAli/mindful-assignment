const sendToken = require("../utils/jwtToken");
const Admin = require(`../module/admin`);

exports.getAdmin = (req,res,next) => {
    res.status(200).json({
        success: true,
        message: `This route will  show admin.`
    })
}

// Create new admin => /mindful/admin/new
exports.newAdmin = async ( req,res,next) => { 
        const {name,email, password,phone,gender,getToKnow,city,state} = req.body;
    
        const admin = await Admin.create({
            name,
            email,
            password,
            phone,
            gender,
            getToKnow,
            city,
            state
        })

    sendToken(admin,200,res)
}

//Login admin => /mindful/login
exports.loginAdmin = async (req,res,next) => {
    const {email, password} = req.body;

    //check if email and password is entered by admin
    if(!email || !password){
        return next(`Please enter email & password`,400);
    }

    //Finding admin in database
    const admin  = await Admin.findOne({email}).select(`+password`)

    if(!admin){
        return next(`Invalid Email or Password`,401);

    }

    //Check if password is correct or not
    const isPasswordMatched = await admin.comparePassword(password);

    if(!isPasswordMatched){
        return next(`Invalid Email or Password`,401);

    }

    sendToken(admin,200,res)
}


//Logout admin  => /mindful/logout
exports.logoutAdmin = async (req,res,next) => {
    res.cookie(`token`,null,{
        expires: new Date(Date.now()),
        httpsOnly: true
    })
    res.status(200).json({
        success: true,
        message: `Logged out`
    })
}




