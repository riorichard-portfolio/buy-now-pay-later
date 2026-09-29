import * as ut from "./type";

export class RegisterInput {
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly type: ut.TCustomer | ut.TMerchant
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
        public readonly userType: ut.TCustomer | ut.TMerchant
    ) {}
}