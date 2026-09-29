import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

import * as pl from "../dto/payload"
import * as c from "./const"

export class Provider {
    private readonly tokenPrivateKey: string
    private readonly tokenPublicKey: string
    constructor(
        privatePath: string,
        publicPath: string,
        private readonly expiresInSec: number = 24 * 3600
    ) {
        this.tokenPrivateKey = fs.readFileSync(path.join(process.cwd(), privatePath), 'utf8')
        this.tokenPublicKey = fs.readFileSync(path.join(process.cwd(), publicPath), 'utf8')
    }

    public generate(payload: pl.TokenPayload): string {
        return jwt.sign(
            {
                userId: payload.userId,
                userType: payload.userType
            },
            this.tokenPrivateKey,
            {
                algorithm: 'RS256',
                expiresIn: this.expiresInSec
            }
        )
    }

    public verify(token: string): pl.TokenPayload | null {
        try {
            const decoded = jwt.verify(
                token,
                this.tokenPublicKey,
                { algorithms: ['RS256'] }
            )
            if (typeof decoded == 'object' && decoded != null) {
                if (typeof decoded['userId'] != 'string' ||
                    (typeof decoded['userType'] != 'string')
                ) {
                    return null
                } else {
                    if (
                        decoded['userType'] != c.customerTyped &&
                        decoded['userType'] != c.merchantTyped
                    ) {
                        return null
                    }
                    return new pl.TokenPayload(decoded['userId'], decoded['userType'])
                }
            } else {
                return null
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error instanceof jwt.JsonWebTokenError) {
                    return null
                } else {
                    throw new Error(`verify access token error: ${error}`)

                }
            }
            throw new Error(`unknown verify access token error: ${error}`)
        }
    }
}