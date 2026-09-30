import * as dto from "../dto/dto"

export const loginData = (data: dto.LoginOutput) => ({
    "token": data.token,
    "user_type": data.userType
})