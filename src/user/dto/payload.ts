import * as t from "./type"

export class TokenPayload {
    constructor(
        public readonly userId: string,
        public readonly userType: t.TCustomer | t.TMerchant
    ) { }
}