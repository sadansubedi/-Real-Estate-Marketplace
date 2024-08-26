import User from "../models/usermodel.js"
import bcryptjs  from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
const Signup =async(req,res,next)=>{
    // console.log(req.body);
    const {username,email,password} = req.body;
    const hashpassword = bcryptjs.hashSync(password,10);

    const result = new User({
        username:username,
        email:email,
        password:hashpassword
    })
    try {
        const results = await result.save()
    // res.status(201).send(results)
    res.status(201).json({ message: "successfully created", data: results });
    console.log(results)
    } catch (error) {
        // res.status(500).json(error.message);

        //manual error handling using middleware
        next(error);
        // next(errorHandler(550,'error from the function'))//it is created to give manual error message
        
    }
    
}

export {Signup}