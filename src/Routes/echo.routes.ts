import { Router } from "express";
import echoController from "../Controllers/echo.controller";

const router = Router();

router.post("/forward/:url", echoController);

export default router;
