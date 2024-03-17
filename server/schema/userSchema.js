import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    mailID: {type: String, required: true},
    password:{type: String, required: true},
      
})

const users = mongoose.model("User", userSchema)

export {users}