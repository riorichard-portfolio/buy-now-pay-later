import { Request, Response } from 'express'

import * as u from "../usecase/usecase"
import * as dto from "../dto/dto"
import * as v from "./validator"
import * as expressh from "../../shared/expressh"
import * as respd from "./respdata"

export class Handler {
    constructor(
        private readonly usc: u.Usecase
    ) { }

    public register = async (req: Request, resp: Response) => {
        const zodRes = v.registerReqVal.safeParse(req.body)
        if (!zodRes.success) {
            return expressh.invalidDataResp(resp, zodRes)
        }
        const res = await this.usc.register(
            new dto.RegisterInput(
                zodRes.data.email, zodRes.data.password, zodRes.data.type
            )
        )
        if (!res.isSuccess) return expressh.usecaseFailedResp(resp, res.reason)
        return expressh.createdResp(resp)
    }

    public login = async (req: Request, resp: Response) => {
        const zodRes = v.loginReqVal.safeParse(req.body)
        if (!zodRes.success) {
            return expressh.invalidDataResp(resp, zodRes)
        }
        const res = await this.usc.login(
            new dto.LoginInput(
                zodRes.data.email, zodRes.data.password
            )
        )
        if (!res.isSuccess) return expressh.usecaseFailedResp(resp, res.reason)
        return expressh.successResp(resp, respd.loginData(res.data))
    }
}