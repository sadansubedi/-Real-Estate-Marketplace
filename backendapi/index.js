import express from 'express'//Ecmascript 6 
const app = express();

const port = process.env.PORT || '3000';

app.get('/',(req,res) =>{
    res.send("Hell sadan it's you first express code  ")
})

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);

})