import { Request } from 'express';

import * as pl from "../dto/payload"

declare global {
    namespace Express {
        interface Request {
            auth: pl.TokenPayload
        }
    }
}