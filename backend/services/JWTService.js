const jwt = require('jsonwebtoken');
const accessTokenSecret = 'ee5d8ea88eec618b21520f1d7000982565e5befe4e189c2b598f8253f5e65ae1bb960a56c19a89210c16046af0d0443608615212e76fd0cabca1e07382fe7e33'
const refreshTokenSecret = 'af76aa635e19346cbc387d97b04f2c0c8b734f9a7531a0d89ce5924488e9c7393e8c9ac6858b51b555d83f1560ed15ba778bacd52b07188aa00306883db3b371'
const RefreshToken = require('../models/token');
class JWTService {
    static signAccessToken(payload, expiry)
    {
        return jwt.sign(payload, accessTokenSecret, {expiresIn: expiry});
    }
    static signRefreshToken(payload, expiry)
    {
        return jwt.sign(payload, refreshTokenSecret, {expiresIn: expiry});
    }
    static verifyAccessToken(token)
    {
        return jwt.verify(token, accessTokenSecret);
    }
    static verifyRefreshToken(token)
    {
        return jwt.verify(token, refreshTokenSecret);
    }
    static async storeRefreshToken(token, userId)
    {
        try{
            const newToken = new RefreshToken({
                token: token,
                userId: userId
            
            }); 
            await newToken.save(); 
        }
        catch(error){
            console.log(error);
        }
    }

}
module.exports = JWTService;