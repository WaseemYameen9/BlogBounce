
const Joi = require('joi')
const user = require('../models/User')
const bcrypt = require('bcrypt')
const jwtService = require('../services/JWTService')
const RefreshToken = require('../models/token')

const authUser = async (req,res,next)=>
{
    console.log('register called')
    const UserRegisterSchema = Joi.object({
        name: Joi.string().max(20).min(3).required(),
        phoneNumber: Joi.string().max(15).min(11).required(),
        address: Joi.string().max(50).min(2).required(),
        email: Joi.string().max(40).min(12).required(),
        password: Joi.string().max(20).min(8).required(),
        
    })
    const {error} = UserRegisterSchema.validate(req.body)
    if(error)
    {
        error.message = "Validation Error in User Registration"
        return next(error);
    }
    const userr = await user.findOne({email:req.body.email})
    if(userr != null)
    {
        return res.status(400).json({'message':'User Already Exists'})
    }
    const {name, phoneNumber, address, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password,10)

    let accessToken;
    let refreshToken;
    let User;
    try{
        User = new user({
            name,
            phoneNumber,
            address,
            email,
            password:hashedPassword
        })
        User.save();
        accessToken = jwtService.signAccessToken({_id:User._id}, '30m')
        refreshToken = jwtService.signRefreshToken({_id:User._id}, '60m')
    }
    catch(error){
        return next(error)
    }
    await jwtService.storeRefreshToken(refreshToken, User._id)
    res.cookie('accessToken', accessToken, 
    {
        maxAge: 24*60*60*1000, 
        httpOnly:true
    })
    res.cookie('refreshToken', refreshToken, 
    {
        maxAge: 7*24*60*60*1000, 
        httpOnly:true
    })

    return res.status(200).json({User, auth: true});

}
async function Login(req,res,next)
{
    const {email, password} = req.body
    const Exist = await user.findOne({email:email})
    if(Exist)
    {
        const matched = await bcrypt.compare(password,Exist.password)
        if(matched)
        {
            const accessToken = jwtService.signAccessToken({_id:Exist._id, email: Exist.email}, '30m')
            const refreshToken = jwtService.signRefreshToken({_id:Exist._id, email: Exist.email}, '60m')
            
            try{
                await RefreshToken.updateOne({userId:Exist._id},{token:refreshToken},{upsert: true})
            }
            catch(error){
                return next(error)
            }       
            res.cookie('accessToken', accessToken,{
                maxAge: 60*60*1000*24,
                httpOnly: true
            })
            res.cookie('refreshToken', refreshToken,{
                maxAge: 60*60*1000*24*7,
                httpOnly: true
            })

            return  res.status(200).json({User: Exist, auth:true});  
        }
        else{
            error = {
                status:400,
                message:'Password is Incorrect'
            }
            next(error)
        }
    }
    else{
        const error = {
            status:400,
            message:'User Not Found'
        }
        next(error)
    }


}
async function Logout(req,res,next) {   
    //del refresh token
    const {refreshToken} = req.cookies
    try{
        await RefreshToken.deleteOne({token:refreshToken})
    }
    catch(error){
        return next(error)
    }
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    //send res to user
    res.status(200).json({User: null, auth:false})
}

async function FRefreshToken(req,res,next)
{
    const originalRefreshToken = req.cookies.refreshToken
    let id;
    try
    {
        id = jwtService.verifyRefreshToken(originalRefreshToken)._id
    }
    catch(e)
    { 
        const error = {
            status:401,
            message:'Unauthorized'
        }
        return next(error)
    }
    try
    {
        let match = RefreshToken.findOne({_id:id, token:originalRefreshToken})
        if(!match)
        {
            const error = {
                status:401,
                message:'Unauthorized'
            }
            return next(error)
        }
    }
    catch(e){
        return next(e)
    }

    try{
        const accessToken = jwtService.signAccessToken({_id:id}, '30m')
        const refreshToken = jwtService.signRefreshToken({_id:id}, '60m')
        await RefreshToken.updateOne({userId:id},{token:refreshToken})
        res.cookie('accessToken', accessToken,{
            maxAge: 60*60*1000*24,
            httpOnly: true
        })
        res.cookie('refreshToken', refreshToken,{
            maxAge: 60*60*1000*24*7,
            httpOnly: true
        }) 
    }
    catch(e){
        return next(e)
    }
    try
    {
        const userr = await user.findOne({_id:id})
        res.status(200).json({User: userr, auth:true})
    }
    catch(e)
    {
        return next(e)
    }

}


module.exports = {
    authUser,
    Login,
    Logout,
    FRefreshToken
}