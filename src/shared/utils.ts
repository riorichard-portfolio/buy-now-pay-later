import crypto from "crypto"

export const NewUUID = () => {
    return crypto.randomUUID()
}