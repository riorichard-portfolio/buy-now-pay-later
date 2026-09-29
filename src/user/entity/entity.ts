import * as t from "./type"

class User {
    constructor(
        private readonly id: string,
        private readonly email: string,
        private readonly hashedPassword: string,
        private readonly type: t.TCustomer | t.TMerchant
    ) { }

    public getId() { return this.id }
    public getEmail() { return this.email }
    public getHashedPassword() { return this.hashedPassword }
    public getUserType() { return this.type }

    public isMerchant() { return this.type == 'MERCHANT' }
    public isCustomer() { return this.type == 'CUSTOMER' }
}

export type TUser = User

export class EntityF {
    public static user(
        id: string,
        email: string,
        hashedPassword: string,
        type: t.TCustomer | t.TMerchant
    ): User {
        return new User(id, email, hashedPassword, type)
    }
}