import { Response } from "express"
import { ZodSafeParseResult } from 'zod'

const internalErrorMessage = 'internal server error'

const invalidBodySCode = 400
const successSCode = 200
const createdSCode = 201
const notFoundDataSCode = 404
const duplicationConstraintSCode = 409
const unauthorizedSCode = 401
const internalErrorSCode = 500
const usecaseFailedSCode = 422

type TMessage = string | string[]

export function invalidDataResp<T>(
    resp: Response,
    zodRes: ZodSafeParseResult<T>
) {
    if (zodRes.success) {
        throw new Error("invalidDataResponse called with valid data");
    }

    const message = zodRes.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
    }));

    return resp.status(invalidBodySCode).json({
        message,
    });
}

export function successResp(resp: Response, data?: any) {
    return resp.status(successSCode).json(data ? { data } : null)
}

export function createdResp(resp: Response) {
    return resp.status(createdSCode).json(null)
}

export function notFoundResp(resp: Response, msg: TMessage) {
    return resp.status(notFoundDataSCode).json({ message:msg })
}

export function duplicationConstraintResp(resp: Response, msg: TMessage) {
    return resp.status(duplicationConstraintSCode).json({ message:msg })
}

export function unauthorizedResp(resp: Response, msg: TMessage) {
    return resp.status(unauthorizedSCode).json({ message:msg })
}

export function internalErrorResp(resp: Response) {
    return resp.status(internalErrorSCode).json({ message: internalErrorMessage })
}

export function usecaseFailedResp(resp: Response, msg: TMessage) {
    return resp.status(usecaseFailedSCode).json({ message:msg });
}