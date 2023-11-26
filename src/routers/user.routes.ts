import { Router } from "express";
import { verifyUniqueCpf, verifyUniqueEmail, verifyUserExists } from "../middlewares/users.middleware";
import { createUserController, readAllUsersController, readUserController } from "../controllers/users.controller";
import { verifyManager } from "../middlewares/globals.middleware";

export const userRouter: Router = Router()

userRouter.post("/", verifyUniqueEmail, verifyUniqueCpf, createUserController)
userRouter.get("/", readAllUsersController)

userRouter.get("/:id", verifyUserExists, readUserController)
userRouter.patch("/:id", verifyUserExists)
userRouter.delete("/:id", verifyManager, verifyUserExists)