import express from 'express'
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js';
import contactsRouter from './routes/contactsRouter.js';
import cors from 'cors';
const app = express()

dotenv.config()
const username = process.env.contactsusername
const password = process.env.contactspassword
const mongoDBURL =`mongodb+srv://${username}:${password}@cluster0.grns5vd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(cors())



const PORT = "3000";

async function main(){

    try{
       await  mongoose.connect(mongoDBURL)
       .then(()=>console.log("DB Connected"))
    }
    catch(e){
        console.log(e)
    }

    app.use("/user", userRouter)
    app.use("/contact", contactsRouter)
    
    

    app.listen(PORT, ()=>{
        console.log(`App is listening on ${PORT}`)
    })

} 


main().catch(e=>console.log(e))



