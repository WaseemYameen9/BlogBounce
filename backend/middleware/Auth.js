const jwtService = require('../services/JWTService')
const User = require('../models/User')
const auth = async (req,res,next) =>
{
    //const refreshToken=req.cookies['refreshToken']
    //const accessToken=req.cookies['accessToken']
    //console.log(req.cookies)
    const {refreshToken, accessToken} = req.cookies
    let id;
    if(!refreshToken || !accessToken)
    {
        const error = {
            status:401,
            message:'Unauthorized'
        }
        return next(error)
    }
    try{
        id = jwtService.verifyAccessToken(accessToken)._id
    }
    catch(error)
    {
        next(error)
    }
    let user;
    try
    {
        user = await User.findOne({_id: id})
    }
    catch(error)
    {
        next(error)
    }
    req.user = user
    next()
    
}
module.exports = auth;