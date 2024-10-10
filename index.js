import express from "express";
import router from "./routes/routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import seedDatabase from "./config/seedDatabase.js";

const app = express();
dotenv.config();
const PORT = 5000;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connection to MongoDB is success");
  })
  .catch((error) => console.log("Connection to MongoDB Error :", error));

// seedDatabase().catch(console.error);

app.use("/", router);

app.listen(PORT, () => {
  console.log(`locate parking server is running on ${PORT}`);
});
