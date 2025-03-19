import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config/db"
export default function auth(req,res,next){

    const token=req.body.token
    const decodedData=jwt.verify(token,JWT_SECRET)

    if(decodedData){
        req.userId=decodedData.userId
        next()
    }else{
        res.status(403).json({
            message:"Incorrect Credintials"
        })
    }
    


}