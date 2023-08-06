import { getAssetMenu } from "../utils/get-asset-menu.util";
import { Router } from "express";
import { checkRole } from "../middlewares/check-role.mw";
import { add } from "winston";
import { addToAsset } from "../controllers/asset.controller";
const router = Router();


router.get('/getAccessCodes', checkRole, getAssetMenu);
router.post('/addToAsset', addToAsset);

export default router;