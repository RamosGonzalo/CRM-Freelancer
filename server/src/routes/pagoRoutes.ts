import express from "express";
import { crearPago, listarPagos, editarPago, eliminarPago } from "../controllers/pagoController";
import { checkAuth } from "../middleware/checkAuth";

const pagoRoutes = express.Router();

pagoRoutes.post("/", checkAuth, crearPago);
pagoRoutes.get("/", checkAuth, listarPagos);
pagoRoutes.put("/:id", checkAuth, editarPago);
pagoRoutes.delete("/:id", checkAuth, eliminarPago);

export default pagoRoutes