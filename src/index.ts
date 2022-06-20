import * as dotenv from 'dotenv';
import { myDataSource } from "./app-data-source";
import app from "./app";

dotenv.config()
const port = process.env.PORT;

myDataSource
    .initialize()
    .then(() => {
        app.listen(port, () => console.log(`Server started at port ${port}`));
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error(err)
    });
