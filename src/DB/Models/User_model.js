import mongoose from "mongoose";

const User_schema = new mongoose.Schema({




  
}, { timestamps: true });

const User_model = mongoose.models.User || mongoose.model("User", User_schema);

export default User_model;