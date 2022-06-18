declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: number;
        DB_PORT: number;
        DB_URL: string;
        DB: string;
        DB_USER: string;
        DB_PASSWORD: string;
    }
}