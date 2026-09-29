import * as dto from "../dto/dto"
import * as r from "../../shared/result"
import { IUserRepo } from "./interface/repo"
import { ITokenProvider } from "./interface/token"
import { IHasher } from "./interface/hash"
import * as res from "./result"
import * as utils from "../../shared/utils"
import * as ent from "../entity/entity"
import * as pl from "../dto/payload"


export class Usecase {
    constructor(
        private readonly userRepo: IUserRepo,
        private readonly tokenProvider: ITokenProvider,
        private readonly hasher: IHasher
    ) { }

    public async register(input: dto.RegisterInput): Promise<r.TResult<null>> {
        const userFindR = await this.userRepo.findByEmail(input.email)
        if (userFindR.isSuccess) {
            return res.EmailExistsF
        }
        const userId = utils.NewUUID()
        const hashed = await this.hasher.hash(input.password)
        const newUser = ent.EntityF.user(userId, input.email, hashed, input.type)
        await this.userRepo.saveNew(newUser)
        return r.ResultF.success()
    }

    public async login(input: dto.LoginInput): Promise<r.TResult<dto.LoginOutput>> {
        const userFindR = await this.userRepo.findByEmail(input.email)
        if (!userFindR.isSuccess) {
            return userFindR
        }
        const user = userFindR.data
        const isPassCorrect = await this.hasher.verify(input.password, user.getHashedPassword())
        if (!isPassCorrect) {
            return res.InvalidPasswordF
        }
        const token = this.tokenProvider.generate(
            new pl.TokenPayload(user.getId(), user.getUserType())
        )
        return r.ResultF.data(
            new dto.LoginOutput(token, user.getUserType())
        )
    }
}