import express from 'express'
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import userrouter from './routes/userrouter.js';
import imagerouter from './routes/imagerouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT=4000;
app.use("/user", userrouter);
app.use("/images",imagerouter)
connectDB().then(() =>
     console.log("MongoDB connected"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});