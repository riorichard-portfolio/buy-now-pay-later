import * as r from "../../shared/result"

export const EmailExistsF = r.ResultF.failed("EMAIL_EXISTS")
export const InvalidPasswordF = r.ResultF.failed("INVALID_PASSWORD")