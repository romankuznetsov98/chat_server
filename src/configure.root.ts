import { ConfigModule } from "@nestjs/config";

const enviroment = process.env.NODE_ENV || 'development';

export const configModule = ConfigModule.forRoot({
    envFilePath: `.env.${enviroment}`,
    isGlobal: true,
})