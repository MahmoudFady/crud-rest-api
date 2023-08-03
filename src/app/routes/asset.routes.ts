import { getAssetMenu } from "../utils/get-asset-menu.util";
import { Router } from "express";
import { checkRole } from "../middlewares/check-role.mw";
const router = Router();


router.get('/getAccessCodes', checkRole, getAssetMenu);

export default router;