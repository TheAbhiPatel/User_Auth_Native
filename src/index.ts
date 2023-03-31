import express, { Application, Request, Response } from "express";
import cors from "cors";
import { HOSTNAME, MONGODB_URL, PORT } from "./config";
import connectDB from "./utils/connectDB";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import requestLogger from "./middleware/requestLogger";

const app: Application = express();

// configure middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(deserializeUser);
app.use(requestLogger);

// configure routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "hey crowd funding" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(Number(PORT), HOSTNAME ? HOSTNAME : "localhost", () => {
  console.log(`server is runnig at -  http://${HOSTNAME}:${PORT}`);
  connectDB(MONGODB_URL);
});
