import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT,
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'gobus',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_default_secret_key',
        expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    },
};

export default config;