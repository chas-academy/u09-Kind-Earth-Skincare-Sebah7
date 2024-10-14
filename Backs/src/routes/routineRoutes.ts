import { Router } from "express";
import { routineMatchController } from "../controllers/routineController";

const RoutineRouter = Router();

RoutineRouter.post("/routine-match", routineMatchController);

export default RoutineRouter;
