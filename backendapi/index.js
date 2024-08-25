import express from 'express'//Ecmascript 6 
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
// console.log(process.env.MONGO_URL)


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongodb");
}).catch((error)=>{
    console.log(error)    
})



const app = express();


const port = process.env.PORT || '3000';


app.get('/',(req,res) =>{
    res.send("Hell sadan it's you first express code  ")
})

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);

})