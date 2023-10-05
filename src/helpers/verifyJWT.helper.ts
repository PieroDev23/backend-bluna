import jwt from 'jsonwebtoken';


export const verifyJWT = (token: string) => {
    const secret = process.env.SECRET_KEY!;

    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.error("Error al verificar el token JWT:", err);
                // En caso de error, puedes devolver un mensaje de token inválido
                reject("Token inválido");
            } else {
                console.log("Token JWT verificado con éxito:", decoded);
                resolve(decoded);
            }
        });
    });
};