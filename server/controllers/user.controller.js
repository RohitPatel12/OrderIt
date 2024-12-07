import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import generatedRefreshToken from '../utils/generatedRefreshToken.js'
import generatedAccessToken from '../utils/generatedAccessToken.js'
import jwt from 'jsonwebtoken'
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js'
import generatedOtp from '../utils/generatedOtp.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'
  

export async function registerUserController(request, response){
    try  {
        const {name, email, password } = request.body
        // To check for empty or incomplete input from the user
        if (!name || !email || !password ) {
            return response.status(400).json({
                message : "Provide name, email, password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({email})
        // Check if user already resistered
        if (user){
            return response.json({
                message : "Email already registered",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)
     ///
        const payload = {
            name,
            email,
            password : hashPassword
        }
        // Save the user details in DB
        const newUser = new UserModel(payload)
        const save = await newUser.save()

        // Email verification 
        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`
        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "VeriFy email from OrderIt",
            html : verifyEmailTemplate({
                name : name,
                url : verifyEmailUrl
            })
        })

        // Status response to user if already registered
        return response.json({
            message :"User registered successfully",
            error : false,
            success : true,
            data : save 
        })

    } catch (error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}  

export async function verifyEmailController(request, response){
   try {
        const { code } = request.body

        const user = await UserModel.findOne({ _id : code })

        if (!user) {
            return response(400).json({
                message: "Invalid user",
                error: true,
                success: false
        })
        }

        const updateUser = await UserModel.updateOne({ _id : code },{
            verify_email: true
        })
        return response.json({
            message: "User verified and updated",
            error: false,
            success: true
        })

   } catch (error) {
    return response.status(500).json({
        message: error.message || error,
        error : true,
        success : false
    })
   }
}

//Login controller
export async function loginController(request, response){
    try {
        const { email, password } = request.body
        // Validate input
        if (!email || !password) {
            return response.status(400).json({
                message: "Please provide email and password",
                error : true,
                success : false 
            })
        }

        // Check in database for user
        const user = await UserModel.findOne({ email })
        // console.log(email)
        // console.log(user)
        // console.log("I am login user id ",user._id)
        if (!user){
            return response.status(400).json({
                message:"User not registered",
                error: true,
                success:false
            })
        }

        if (user.status !== "Active"){
            return response.status(400).json({
                message:"Contact to admin",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password)

        if (!checkPassword){
            return response.status(400).json({
                message:"Check your password",
                error:true,
                success:false
            })
        }

        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.cookie('accessToken', accessToken, cookiesOption)
        response.cookie('refreshToken', refreshToken, cookiesOption)

        return response.json({
            message: "Logged in successfully",
            error : false,
            success : true,
            data : {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//Logout controller
export async function logoutController(request, response){
    try {

        const userid = request.userId
        // console.log("I am request.userId", request.userId)
        // console.log("I am userid", userid)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        response.clearCookie('accessToken', cookiesOption)
        response.clearCookie('refreshToken', cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
            refresh_token : ""
        })

        return response.json({
            message : "Logged out successfully",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}

//Upload user Avatar
export async function uploadAvatar(request, response){
    try {
        const userId = request.userId
        const image =  request.file
        // console.log("image", image)
        const upload = await uploadImageCloudinary(image)
        // console.log(upload)

        const updateUser =  await UserModel.findByIdAndUpdate(userId,{
            avatar : upload.url
        })

        return response.json({
            message : "Upload Image",
            success : true,
            error : false,
            data : {
                _id : userId,
                avatar : upload.url 
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}

//Update user details
export async function updateUserDetails(request, response){
    try {
        
        const userid = request.userId
        const {name, email, mobile, password} = request.body

        let hashPassword = ""

        if (password){

            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password,salt)

        }

        const updateUser = await UserModel.findByIdAndUpdate(userid,{
            ...(name && {name : name}),
            ...(email && {email : email}),
            ...(mobile && {mobile : mobile}),
            ...(password && {password : hashPassword})
        })

        return response.json({
            message:"User details updated successfully",
            error: false,
            success : true,
            date : updateUser
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}
//forgot password when not logged in 
export async function forgotPasswordController(request, response){
    try {
        const { email } = request.body
        // console.log(email)

        const user = await UserModel.findOne({ email })
        // console.log("I am user",user)
        if (!user){
            return response.status(400).json({
                message:"email not registeredd",
                error : true,
                success : false
            })
        }

        const otp = generatedOtp()
        const expireTime = new Date() + 60 * 60 *1000

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo: email,
            subject: "Forgot password from orderIt",
            html: forgotPasswordTemplate({
                name : user.name,
                otp : otp
            })
        })

        return response.json({
            message:"Check your mail for one time password",
            error: false,
            success:true
        })


        } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}

//Verify password OTP
export async function verifyForgotPasswordOtp(request, response){
    try {
        const { email, otp} = request.body

        if (!email || !otp){
            return response.status(400).json({
                message : "Provde email and OTP",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({email})

        if (!user){
            return response.status(400).json({
                message:"email not registeredd",
                error : true,
                success : false
            })
        }   

        const currentTime = new Date().toISOString()

        if (user.forgot_password_expiry < currentTime){
            return response.status(400).json({
                message : "OTP is expired",
                error : true,
                success : false
            })
        }

        if (otp !== user.forgot_password_otp){
            return response.status(400).json({
                message: "Invalid OTP",
                error : true,
                successs : false
            })
        }

        //If OTP not expired and OTP === user.forgotPasswordOTP
        return response.json({
            message : "OTP verification successful",
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}

// Reset password
export async function resetPassword(request, response){
    try {
        const { email, newPassword, confirmPassword} = request.body

        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message : "Provide required fileds email and new password and confirm password",
                error : true,
                success: false
            })
        }

        const user = await UserModel.findOne({email})

        if (!user){
            return response.status(400).json({
                message:"Email not available in DB",
                error: true,
                success : false
            })
        }

        if (newPassword !== confirmPassword){
            return response.status(400).json({
                message:"New password and confirm password not equal",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword, salt)

        const update = await UserModel.findByIdAndUpdate(user._id,{
            password : hashPassword
        })

        return response.json({
            message : "Password changed successfully",
            error : false,
            success : true 
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success : false
        })
    }
} 

//Refresh Token controller
export async function refreshToken(request, response){
    try {

        const refreshToken = request.cookies.refreshToken || request?.header?.authoriation?.split(" ")[1]

        if (!refreshToken){
            return response.status(400).json({
                message : "Invalid token ",
                error : true,
                success : false
            })
        }

        const verifyToken =  await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if (!verifyToken){
            return response.status(401).json({
                message:"Token is expired",
                error:true,
                success:false
            })
        }

        const userId = verifyToken?._id 

        const newAccessToken = await generatedAccessToken(userId)
  
        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        } 

        response.cookie("accessToken",newAccessToken,cookiesOption)

        return response.json({  
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error: true,
            success: false
        })
    }
}