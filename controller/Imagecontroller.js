import Image from "../models/image.js";
import cloudinary from "../config/cloudinary.js";

export const uploadImage=async(req,res)=>{
    try{
        const{title,description,category}=req.body;
         if(!req.file) 
    {
      return res.status(400).json({ message: "No file uploaded" });
    }
     const newImage=new Image({
      title,
      description,
      category ,
      imageUrl:req.file.path,
      uploadedBy: req.user.userId,
    });
    await newImage.save();
    res.status(201).json({
        message:"image uploaded successfully",
        image:newImage,
    });
}
catch(error){
    res.status(500).json({ message: error.message });
}
};



export const getallimages=async(req,res)=>{
  try{
      const images=await Image.find()
        .populate("uploadedBy","name email")
        .sort({ createdAt: -1 });
      res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
   export const getmyimages=async(req,res)=>{
try {
    const images=await Image.find({
      uploadedBy:req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
   }


export const deleteimage=async(req,res)=>{
  try{
    const{id}=req.params;
    const image=await Image.findById(id);
    if(!image){
      return res.status(404).json({
        message:"Image not found"
      });
    }
    if(image.uploadedBy.toString()!==req.user.userId){
      return res.status(403).json({
            message: "You can only delete your own images"
      })    }
await image.deleteOne();
return res.status(200).json({
  message:"image deleted successfullly"
});

}catch(error){
  console.error("delete image error:",error);
  return  res.status(500).json({
    message:"something went wrong "
  })
}
};