import express from 'express'//Ecmascript 6 
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userouter from './routes/userroute.js'
import authrouter from './routes/authroute.js'
import Listingrouter from './routes/listingroute.js'
import cookieParser from 'cookie-parser';
import path from 'path';
// import { fileURLToPath } from 'url';
dotenv.config();
// console.log(process.env.MONGO_URL)

//Resolving dirname for ES6 module
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// console.log("Name ->",__dirname)


const app = express();

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongodb");
}).catch((error)=>{
    console.log(error)    
});

const __dirname = path.resolve();
const port = process.env.PORT || '3000';

app.use(express.json())
app.use(cookieParser());//to retrieve cookies
app.use("/api/user",userouter)
app.use("/api/auth",authrouter)
app.use("/api/listing",Listingrouter)

// app.use(express.static(path.join(__dirname,'/frontend/dist')));
// app.get('*',(req,res)=>{
    // res.sendFile(path.join(__dirname,'/frontend/dist/index.html'));
// })

app.use(express.static(path.join(__dirname,'/frontend/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend','dist','index.html'));
})

//middleware and function to handle possible error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode:statusCode,
        message,
    })

})


app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);

})