import express from "express";
import { crearTarea, listarTareas, editarTarea, eliminarTarea } from "../controllers/tareaController";
import { checkAuth } from "../middleware/checkAuth";

const tareaRoutes = express.Router();

tareaRoutes.post("/", checkAuth, crearTarea);
tareaRoutes.get("/", checkAuth, listarTareas);
tareaRoutes.put("/:id", checkAuth, editarTarea);
tareaRoutes.delete("/:id", checkAuth, eliminarTarea);

export default tareaRoutes;
