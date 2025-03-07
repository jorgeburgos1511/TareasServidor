import { Router } from "express";
import { getProfile } from "../controllers/profile.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/perfil", verifyToken, getProfile);

export default router;