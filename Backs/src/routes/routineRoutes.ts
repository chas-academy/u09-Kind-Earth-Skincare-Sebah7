import { Router } from "express";
import {
  deleteRoutine,
  getRoutines,
  renameRoutine,
  routineMatchController,
} from "../controllers/routineController";
import auth from "../middlewares/authMiddleware";

const RoutineRouter = Router();

RoutineRouter.post("/routine-match", routineMatchController);
RoutineRouter.get("/getRoutines", auth, getRoutines);
RoutineRouter.delete("/:routineId/delete", auth, deleteRoutine);
RoutineRouter.put("/:routineId/rename", auth, renameRoutine);

export default RoutineRouter;
