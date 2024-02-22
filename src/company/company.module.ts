import { Module, forwardRef } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { CompanyService } from './company.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [CompanyService, PrismaService],
  controllers: [CompanyController],
  exports: [CompanyService]
})
export class CompanyModule {}
