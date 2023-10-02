import jwt from 'jsonwebtoken';


export const genJWT = (data: any) => {
    const secret = process.env.SECRET_KEY!;
    return jwt.sign({ data }, secret, { expiresIn: 3600 });
}