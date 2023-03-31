import "dotenv/config";

export const PORT = process.env.PORT || 8080;
export const HOSTNAME = process.env.HOSTNAME;
export const MONGODB_URL = process.env.MONGODB_URL!;

export const SEND_EMAIL_USER = process.env.SEND_EMAIL_USER;
export const SEND_EMAIL_PASS = process.env.SEND_EMAIL_PASS;

export const FRONTEND_URL = process.env.FRONTEND_URL;

export const JWT_SECRET_FOR_LOGIN = process.env.JWT_SECRET_FOR_LOGIN!;

export const JWT_SECRET_FOR_EMAIL = process.env.JWT_SECRET_FOR_EMAIL!;
