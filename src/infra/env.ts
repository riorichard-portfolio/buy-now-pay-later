import { z } from "zod";

export class PrismaCfg {
    constructor(
        public readonly url: string
    ) { }
}

export class AppCfg {
    constructor(
        public readonly port: number
    ) { }
}

const envZSchema = z.object({
    PORT: z.coerce.number(),
    DATABASE_URL: z.url()
})

export class EnvConfig {
    public readonly appCfg: AppCfg
    public readonly prismaCfg: PrismaCfg
    constructor() {
        require('dotenv').config()
        const parsedCfg = envZSchema.safeParse(process.env)
        if (!parsedCfg.success) {
            const errors = parsedCfg.error.issues.map((issue) => {
                const field = issue.path[0];
                if (typeof (field) == 'string') {
                    return `${field}: ${issue.message}`;
                }
                return `Unknown field: ${issue.message}`;
            });

            throw new Error(
                `Invalid environment configuration:\n${errors.join("\n")}`
            );
        }
        this.appCfg = new AppCfg(
            parsedCfg.data.PORT
        )
        this.prismaCfg = new PrismaCfg(
            parsedCfg.data.DATABASE_URL
        )
    }
}