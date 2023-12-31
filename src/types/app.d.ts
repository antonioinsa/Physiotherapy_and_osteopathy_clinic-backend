export { }

export interface TokenDecoded {
    id: number,
    email: string
    role: string,
}

declare global {
    namespace Express {
        export interface Request {
            token: TokenDecoded;
        }
    }
}