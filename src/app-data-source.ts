import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config()


export const myDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_URL,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    logging: true,
    synchronize: true
})