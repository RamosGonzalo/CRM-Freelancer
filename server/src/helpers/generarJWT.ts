import jwt, { SignOptions } from 'jsonwebtoken'

export const generarJWT = (id: string): string => {
    const jwtSecret = process.env.JWT_SECRET as string
    const expiracion = (process.env.JWT_EXPIRA || '30d') as SignOptions['expiresIn']

    const options: SignOptions = {
        expiresIn: expiracion
    }

    return jwt.sign({ id }, jwtSecret, options)
}
