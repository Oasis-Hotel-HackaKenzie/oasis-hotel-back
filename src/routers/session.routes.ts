import { Router } from "express";
import { loginController } from "../controllers/sessions.controller";

export const sessionRouter: Router = Router()

sessionRouter.post('/', loginController)