import { Router } from "express";
import {
  deleteRoutine,
  getRoutines,
  renameRoutine,
  routineMatchController,
} from "../controllers/routineController";

const RoutineRouter = Router();

RoutineRouter.post("/routine-match", routineMatchController);
RoutineRouter.get("/:userId/getRoutines", getRoutines);
RoutineRouter.delete("/:routineId/delete", deleteRoutine);
RoutineRouter.put("/:routineId/rename", renameRoutine);

export default RoutineRouter;
