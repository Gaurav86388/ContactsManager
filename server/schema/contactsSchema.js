import mongoose from "mongoose";

const contactsSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Designation:{type: String, required: true},
    Company: {type: String, required: true},
    Industry:{type: String, required: true},
    Email: {type: String, required: true, unique: true},
    PhoneNumber:{type: Number, required: true, unique: true},
    Country: {type: String, required: true},
    userID : {type: mongoose.Schema.Types.ObjectId, ref: "User"}

      
})

const contactDetails = mongoose.model("Contacts", contactsSchema)

export {contactDetails}