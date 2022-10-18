import express from "express";
import cors from "cors";
import axios from "axios";

const server = express();
const trustedURLs = [
  "https://patientaide2.azurewebsites.net",
  "http://localhost:3000",
  "http://localhost:3001",
];

const corsConfig = {
  origin: function (origin, callback) {
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

server.listen(3000, async () => {
  console.log("Server listening on " + 3000);
  try {
    const config = {
        url:"http://localhost:3001/",
        method:"post",
        headers:{
            origin: "http://localhost:3001"
        }
    }
    const test = await axios(config);
    console.log(test);
  } catch (error) {}
});
server.on("error", (error) => console.log("Server crashed due " + error));

export default server;
