import { Request, Response, NextFunction } from "express";

import * as expressh from "../../shared/expressh"
import * as jwtp from "../jwt/provider"
import * as c from "./const"

export class Middleware {
    constructor(
        private readonly jwtprovider: jwtp.Provider
    ) { }

    public auth = (req: Request, resp: Response, next: NextFunction) => {
        const auth = req.headers.authorization
        if (auth == undefined) {
            return expressh.unauthorizedResp(resp, c.noAuthMsg)
        }
        if (!auth.startsWith(c.bearerPrefix)) {
            return expressh.unauthorizedResp(resp, c.invalidBearerMsg)
        }
        const accessToken = auth.substring(c.bearerPrefix.length, auth.length).trim()
        if (accessToken == "") {
            return expressh.unauthorizedResp(resp, c.emptyAuthBearerMsg)
        }

        const res = this.jwtprovider.verify(accessToken)
        if (res == null) {
            return expressh.unauthorizedResp(resp, c.invalidTokenMsg)
        }
        req.auth = res
        return next()
    }
}