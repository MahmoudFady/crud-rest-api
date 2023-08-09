//import { getAssetMenu } from "../utils/get-asset-menu.util";
import {getAssetMenu, getAssetMenuV2} from "../controllers/asset.controller"
import { Router } from "express";
import { checkRole } from "../middlewares/check-role.mw";
import { add } from "winston";
import { addToAsset } from "../controllers/asset.controller";
const router = Router();
// add checkRoleMw in production
router.get('/getAccessCodes', checkRole, getAssetMenu);
router.get('/getAccessCodesV2', getAssetMenuV2);
router.post('/addToAsset', addToAsset);

export default router;