import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);


import express from  "express";
import {createServer} from "node:http";


import userRoutes from "./routes/users.routes.js";

import {Server} from "socket.io";



import mongoose from "mongoose";
import connectToSocket from "./controllers/socketmanager.js";
import cors from "cors";
 
const app = express();
const server = createServer(app);
const io = connectToSocket(server);




app.set("port",(process.env.PORT || 8000 ))
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));
app.use("/api/v1/users", userRoutes);


app.get("/home", (req, res) =>{
    return res.json({"hello":"world"})
});


const start = async () => {

    const connectionDb = await mongoose.connect("mongodb+srv://muskanp8305_db_user:UhVuAkofkxQN4jfE@cluster0.jbmvjdk.mongodb.net/video_cal")
    server.listen(app.get("port"), () => {
        console.log(`MONGO Connected DB HHost: ${connectionDb.connection.host}`)
        console.log("LISTENING ON PORT 8000 ");
    });
}

start();