import { Router as ERouter } from "express";
import * as h from "./handler"

export class Router{
    public readonly router: ERouter = ERouter()
    constructor(
        handler: h.Handler
    ){
        this.router.post('/register', handler.register)
        this.router.post('/login', handler.login)
    }
}