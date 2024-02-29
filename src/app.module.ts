import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { CompanyModule } from './company/company.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    PrismaService,
    AuthModule,
    CaslModule,
    UsersModule,
    CompanyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
