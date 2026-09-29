import { Prisma, PrismaClient } from "../../.prisma.generated/client";

import * as ent from "../entity/entity"
import * as r from "../../shared/result"
import * as res from "./result"

export class UserRepo {
    constructor(
        private readonly p: PrismaClient | Prisma.TransactionClient
    ) { }

    public async findByEmail(email: string): Promise<r.TResult<ent.TUser>> {
        const userd = await this.p.user.findUnique({
            where: { email }
        })
        if (userd == null) {
            return res.userNotFound
        }
        return r.ResultF.data(ent.EntityF.user(
            userd.id,
            userd.email,
            userd.hashedPassword,
            userd.type
        ))
    }

    public async saveNew(data: ent.TUser): Promise<void> {
        await this.p.user.create({
            data: {
                id: data.getId(),
                email: data.getEmail(),
                hashedPassword: data.getHashedPassword(),
                type: data.getUserType()
            }
        })
    }
}