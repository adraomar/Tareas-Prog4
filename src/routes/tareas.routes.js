import { Router } from "express";
import { requiereAutenticacion } from "../middlewares/requiereAutenticacion.js";
import * as controlador from "../controllers/tareas.controller.js";

const router = Router();

router.use(requiereAutenticacion);

router.get("/", controlador.listar);
router.post("/", controlador.crear);
router.put("/:id", controlador.alternar);
router.delete("/:id", controlador.eliminar);

export default router;