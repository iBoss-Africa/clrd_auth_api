import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { CompanyService } from './company/company.service';
import { CompanyModule } from './company/company.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    PrismaService,
    AuthModule,
    CaslModule,
  ],
  controllers: [],
  providers: [CompanyService],
})
export class AppModule {}
