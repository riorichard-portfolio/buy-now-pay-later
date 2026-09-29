import * as ent from "../../entity/entity"
import * as r from "../../../shared/result"

export interface IUserRepo {
    findByEmail(email: string): Promise<r.TResult<ent.TUser>>
    saveNew(data: ent.TUser): Promise<void>
}