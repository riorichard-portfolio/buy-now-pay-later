import { Application } from "express";

import * as u from "./usecase/usecase"
import * as h from "./express/handler"
import * as r from "./express/router"

export function registerApi(
    app: Application,
    usc: u.Usecase
) {
    const handler = new h.Handler(usc)
    const router = new r.Router(handler)
    app.use("/users", router.router)
}