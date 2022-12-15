import express, { urlencoded } from "express";
import dotenv from "dotenv"
import router from "./routers/openRouter.js"

const app = express();
dotenv.config()
const port = process.env.PORT

//middleware to avoid CORS and any POST or OPTIONS error
app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
      );
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }
      next();
    });

//Enable Bodyparser 
app.use(express.json())
app.use(urlencoded({ extended: false }))


app.use("/openai", router)
app.listen(port, () => console.log(`Server started at ${port}`))