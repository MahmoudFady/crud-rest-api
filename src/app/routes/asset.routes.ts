import { getAssetMenu } from "../utils/get-asset-menu.util";
import { Router } from "express";
import { checkRole } from "../middlewares/check-role.mw";
const router = Router();
// add checkRoleMw in production
router.get("/getAccessCodes", getAssetMenu);

export default router;
