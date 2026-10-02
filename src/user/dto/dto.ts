import * as t from "./type";

export class RegisterInput {
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly type: t.TCustomer | t.TMerchant
    ) { }
}

export class LoginInput {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) { }
}

export class LoginOutput {
    constructor(
        public readonly token: string,
        public readonly userType: t.TCustomer | t.TMerchant
    ) {}
}