import { PrismaClient } from '../.prisma.generated/client';
import { PrismaPg } from "@prisma/adapter-pg";
import * as e from './env';

export class PrismaC {
    public readonly client: PrismaClient
    constructor(
        prismaCfg: e.PrismaCfg
    ) {
        const adapter = new PrismaPg({
            connectionString: prismaCfg.url,
        });
        this.client = new PrismaClient({
            adapter
        })
    }
}