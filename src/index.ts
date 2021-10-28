import express, { Application } from "express";
import echoRoutes from "./Routes/echo.routes";
import { Request, Response } from "express";

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

app.use("/echo", echoRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200);
  res.send("<h1>Hi there!</h1>");
});

app.listen(port, () => console.log("Server started"));
