import { Router } from "express";
import jwt from "jsonwebtoken"
import { users } from "../schema/userSchema.js";
import {contactDetails} from "../schema/contactsSchema.js"
import dotenv from 'dotenv'

dotenv.config()
const secret = process.env.secret

const contactsRouter = Router()



function authenticateToken(req, res, next){

    const authHeader = req.headers.authorization

    const token = authHeader ? authHeader.split(" ")[1] : res.json({status: "where is the token man!"})
 
    if(token === null) return res.sendStatus(401)

    jwt.verify(token, secret, async(err, decoded)=>{
        if(err) return console.log(err)

        const userdata = await users.findOne({_id: decoded.data})

        if(!userdata) return res.status(400).json({status:"Unauthorised"})
        
        req.userID= userdata._id
        
        next()

    })

}

contactsRouter.get("/", async(req, res)=>{

    let contactsData 
    try{
        contactsData = await contactDetails.find({})
    }
    catch(e){
        console.log("error fetching data")
    }

    if(contactsData) return res.status(200).json(contactsData)
})

contactsRouter.post("/", async(req, res)=>{

    const data = req.body

    let contactsData

    try{
        contactsData = await contactDetails.create(data)
    }
    catch(e){
        if (error.code === 11000) { 
            res.status(409).json("contact already exist");
          } else {
            console.error(error);
            res.status(500).json("Error creating contact");
          }
    }

    if(contactsData) return res.status(200).json({status: "contacts added"})

})

contactsRouter.delete("/", async(req, res)=>{

    const data = req.body

    let contactsData

    try{
        contactsData = await contactDetails.deleteMany(data)
    }
    catch(e){     
            console.error(error);
 
          }
    

    if(contactsData) return res.status(200).json({status:"contact deleted"})

})







export default contactsRouter