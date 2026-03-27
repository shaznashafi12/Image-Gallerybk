import express from 'express'
import upload from '../config/multer.js'
import { deleteimage, getallimages, getmyimages, uploadImage } from '../controller/Imagecontroller.js'
import authMiddleware from '../middleware/auth.js';

const imagerouter = express.Router()

imagerouter.post('/upload',authMiddleware,
     upload.single("image"),uploadImage);
imagerouter.get("/",getallimages);
imagerouter.get("/my",authMiddleware,getmyimages)
imagerouter.delete("/:id", authMiddleware, deleteimage);

export default imagerouter