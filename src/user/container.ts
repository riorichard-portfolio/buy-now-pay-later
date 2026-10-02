import * as em from "./express/middleware"
import * as jwtp from "./jwt/provider"
import * as u from "./usecase/usecase"
import * as p from "../infra/prisma"
import * as urepo from "./prisma/user_repo"
import * as bhash from "./bcrypt/hasher"

export class Container {
    public readonly middleware: em.Middleware
    private usecase: u.Usecase | null = null
    private readonly jwt: jwtp.Provider
    private readonly pUserRepo: urepo.UserRepo
    private readonly bhasher: bhash.BHasher
    constructor(
        prismaC: p.PrismaC,
        privatePath: string,
        publicPath: string
    ) {
        this.jwt = new jwtp.Provider(privatePath, publicPath)
        this.middleware = new em.Middleware(this.jwt)
        this.pUserRepo = new urepo.UserRepo(prismaC.client)
        this.bhasher = new bhash.BHasher()
    }

    public getUsecase() {
        if (this.usecase != null) {
            return this.usecase
        }
        this.usecase = new u.Usecase(this.pUserRepo, this.jwt, this.bhasher)
        return this.usecase
    }
}