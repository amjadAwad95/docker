const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
// const { Client } = require("pg")

const PORT = process.env.PORT || 4000;

const app = express();

const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
})
redisClient.on("error", (err) => { console.error("Redis Client Error", err) });
redisClient.on("connect", () => { console.error("Redis Client Connected") });
redisClient.connect()

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo'

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
    .connect(URI)
    .then(() => { console.log("Connected to MongoDB") })
    .catch((err) => { console.error("Error connecting to MongoDB:", err) });

// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 5432;
// const DB_HOST = 'postgres'

// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const pgClient = new Client({
//     connectionString: URI,
// });

// pgClient
//     .connect()
//     .then(() => { console.log("Connected to PostgreSQL") })
//     .catch((err) => { console.error("Error connecting to PostgreSQL:", err) });


app.get("/", (req, res) => {
    redisClient.set("products", "products...");
    res.send("<h1>Welcome to My Express Server hi hhff</h1>");
})

app.get("/data", async (req, res) => {
    const products = await redisClient.get("products");
    redisClient.set("products", "products...");
    res.send(`<h1>Welcome to My Express Server</h1> <h2>${products}</h2>`);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})