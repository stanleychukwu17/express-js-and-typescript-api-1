import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get("privateKey") as string;

// generates a jwt token based on details received
export function sign(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
    try {
        const decoded = jwt.verify(token, privateKey);

        return { valid: true, expired: false, decoded };
    } catch (err: any) {
        return {
            valid: false,
            expired: err.message === "jwt expired",
            decoded: null,
        };
    }
}