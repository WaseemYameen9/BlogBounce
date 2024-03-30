const express = require('express')
const DB = require('./services/db');
const cors = require("cors");
const errorHandler = require('./middleware/ErrorHandler')
const userRouter = require('./routes/UserRoute') 
const cookieParser = require('cookie-parser')
const app = express();


app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
      origin: function (origin, callback) {
        return callback(null, true);
      },
      optionsSuccessStatus: 200,
      credentials: false,
    })
  );

app.use("/user",userRouter)

app.use(errorHandler);

app.listen(4000,()=>{
    console.log('server is listening on port 4000')
})
