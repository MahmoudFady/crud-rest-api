import { Router } from "express";
const router = Router();
import departmentModel from "../models/departmen.model";
import ControllerFactory from "../controllers/factory.controller";
const departmentCtrlFactory = new ControllerFactory(departmentModel);
import validationMw from "../middlewares/validation.mw";
import roleAuthMw from "../middlewares/role-auth.mw";


// Parent 1 // get  post
router
    .route("/")
    .all(roleAuthMw)
    .post(
        (req, res, next) => validationMw(next, ["addDepartment", req.body]),
        departmentCtrlFactory.create
    )
    .get(departmentCtrlFactory.getAll(""));


router
    .route("/search")
    .post(roleAuthMw,departmentCtrlFactory.search("", ["employeesNumber"]));

router
    .route("/options")
    .get(departmentCtrlFactory.getOptions);

// 2 patch  get  delete
router
    .route("/:id")
    .all(roleAuthMw,(req, res, next) => validationMw(next, ["mongoId", req.params.id]))
    .get(departmentCtrlFactory.getById("id"))
    .patch(
        (req, res, next) => validationMw(next, ["updateDepartment", req.body]),
        departmentCtrlFactory.updateById("id")
    )
    .delete(departmentCtrlFactory.deleteById("id"));


export default router;

