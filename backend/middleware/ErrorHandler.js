const {ValidationError} = require('joi');

const ErrorHandler = (error,req,res,next)=>
{

    let status = 400;
    let data = {
       message: "Internal server Error"
    }

    if (error instanceof ValidationError)
    {
        status = 422;
        data.message = error.message
        return res.status(status).json(data);
    }

    if (error.status)
    {
        status = error.status
    }
    if (error.message)
    {
        data.message = error.message
    }

    return res.status(status).json(data);

}

module.exports = ErrorHandler;