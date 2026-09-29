import { TokenPayload } from "../../dto/payload";

export interface ITokenProvider {
    generate(payload: TokenPayload): string
    verify(token: string): TokenPayload | null
}