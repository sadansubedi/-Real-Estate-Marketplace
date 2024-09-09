import Listing from "../models/listingmodel.js"
import User from "../models/usermodel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

const test = (req,res)=>{
    // console.log("hello word")
    res.send("hello world")
}

const updateUser =async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only update your own account'))
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar: req.body.avatar
            }
        },{new:true})//only new information update not previous existing information
        const {password,...rest}= updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error);
    }
}

const deleteUser =async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only delete your own account'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');//first clear the cookie and then response status ok 
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error)
    }
}


const getUserListings = async(req,res,next)=>{
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({userRef : req.params.id})
            res.status(200).json(listings);
        } catch (error) {
            next(error)
        }
    }else{
        return next(errorHandler(401,'you can only view your own listings!!'))
    }
}

const getUser =async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user) return next(errorHandler(404,'User not found!'));
        const {password:pass , ...rest} = user._doc;
        res.status(200).json(rest)  
    } catch (error) {
        next(error)
    }
   
}
export {test,updateUser,deleteUser,getUserListings,getUser}