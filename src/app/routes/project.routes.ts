import { Router } from "express";
const router = Router();
import projectModel from "../models/project.model";
import ControllerFactory from "../controllers/factory.controller";
const projectCtrlFactory = new ControllerFactory(projectModel);
import validationMw from "../middlewares/validation.mw";
import roleAuthMw from "../middlewares/role-auth.mw";


// Parent 1 // get  post
router
    .route("/")
    .all(roleAuthMw)
    .post(
        (req, res, next) => validationMw(next, ["addProject", req.body]),
        projectCtrlFactory.create
    )
    .get(projectCtrlFactory.getAll(""));

    router
    .route("/search")
    .post(roleAuthMw,projectCtrlFactory.search("", ["employeesNumber"]));

router
    .route("/options")
    .get(projectCtrlFactory.getOptions);

// 2 patch  get  delete
router
    .route("/:id")
    .all(roleAuthMw,(req, res, next) => validationMw(next, ["mongoId", req.params.id]))
    .get(projectCtrlFactory.getById("id"))
    .patch(
        (req, res, next) => validationMw(next, ["updateProject", req.body]),
        projectCtrlFactory.updateById("id")
    )
    .delete(projectCtrlFactory.deleteById("id"));


export default router;
