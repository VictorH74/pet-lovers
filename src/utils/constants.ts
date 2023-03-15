export const SECRET = process.env.SECRET_KEY || (() => { throw new Error('SECRET_KEY not defined') })();
