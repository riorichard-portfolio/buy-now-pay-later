import bcrypt from 'bcrypt'

export class BHasher {
    constructor(
        private readonly saltRounds: number = 12
    ) { }

    public async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds)
    }

    public async verify(password: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(password, hashed)
    }
}