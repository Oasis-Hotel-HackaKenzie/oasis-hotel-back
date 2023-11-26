import "reflect-metadata"
import "express-async-errors"
import express, { Application } from "express"
import { handleErrors } from "./errors/errors"
import { routes } from "./routers"

const app: Application = express()
app.use(express.json())

app.use('/', routes)

app.use(handleErrors)

export default app