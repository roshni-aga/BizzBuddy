import express from "express";
import auth from "../middleware/authMiddleware.js";
import { saveSheets } from "../controllers/sheetController.js";

const router = express.Router();

router.post("/set-sheet", auth, saveSheets);

export default router;
