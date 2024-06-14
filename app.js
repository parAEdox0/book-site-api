// importing express
import express from "express";

// importing other dependencies
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import router from "./routes/books.js";
import cors from "cors"

// defing app
const app = express();

// defining other variables
dotenv.config()
const port = process.env.PORT;
const atlas_uri = process.env.MONGO_URI;


// middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/books", router);

// db and port connection
mongoose.connect(atlas_uri)
    .then(() => {
        console.log(`Mongo Atlas db connected succesfully`)
        app.listen(port, () => {
            console.log(`App is successfully listening on PORT: ${port}`);
        }).on("error", (err) => console.log(err.message))
    })
    .catch((error) => {
        console.log(error.message)
    })



