import express from "express";
import authRoutes from "./routes/auth.routes.js";
import tareasRoutes from "./routes/tareas.routes.js";
import { manejarErrores } from "./middlewares/manejaErrores.js"

const app = express();

// middlewares
app.use(express.json());

app.use(authRoutes);
app.use("/tareas", tareasRoutes);
app.use(manejarErrores);

export default app;