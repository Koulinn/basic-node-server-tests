import express from "express";
import cors from "cors";
import cron from "node-cron"

const server = express();
const trustedURLs = [
  "https://patientaide2.azurewebsites.net",
  "http://localhost:3000",
  "http://localhost:3001",
];

const corsConfig = {
  origin: function (origin, callback) {
    console.log(origin, "from app");
    if (!origin || trustedURLs.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed"));
    }
  },
};

server.use(cors(corsConfig));
server.use(express.json());

server.post("/", (req, res) => {
  res.send("hello");
});

server.listen(3001, () => {
  console.log("Server listening on " + 3001);
  cron.schedule("00 01 1 * * * ", ()=>{
    console.log('job')
  })
  cron.schedule("00 02 1 * * * ", ()=>{
    console.log('job 2')
  })
  cron.schedule("00 03 1 * * * ", ()=>{
    console.log('job 3')
  })
  cron.schedule("00 01 2 * * * ", ()=>{
    console.log('job 4')
  })
});
server.on("error", (error) => console.log("Server crashed due " + error));

export default server;
