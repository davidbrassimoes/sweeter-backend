import express from "express";
import { Request, Response } from "express";
import * as dotenv from 'dotenv';
import { User } from "./entity/user.entity";
import { myDataSource } from "./app-data-source";

dotenv.config()

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app
const app = express()
app.use(express.json())

// register routes

app.get("/users", async function (req: Request, res: Response) {
    // return all users
    const users = await myDataSource.getRepository(User).find()
    res.json(users)
})

app.post("/users", async function (req: Request, res: Response) {
    // create user
    const user = await myDataSource.getRepository(User).create(req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})


// start express server
app.listen(3000)

console.log(process.env.DB_PASSWORD);