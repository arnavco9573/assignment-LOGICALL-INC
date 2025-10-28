// src/routes/index.ts
import { Router } from "express";
import entryRouter from "./entry.routes";

const router = Router();

// All entry routes will be prefixed with /entries
router.use("/entries", entryRouter);

export default router;