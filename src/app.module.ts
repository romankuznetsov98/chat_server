import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

const enviroment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${enviroment}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_WRITE_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
  ],
})
export class AppModule {}
