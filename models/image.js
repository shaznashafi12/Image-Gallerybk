import mongoose  from "mongoose";

const imageschema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        imageUrl:{
            type:String,
            required:true,
        },
        uploadedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
       category: {
         type: String,
         enum: ['nature','urban','people','Travel']
        },
        date: { 
            type: Date,
            default: Date.now 
        } 

    },
    {

    timestamps: true,
    }
);
const Image=mongoose.model("Image",imageschema);

export default Image;