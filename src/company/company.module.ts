import { Module, forwardRef } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  providers: [CaslAbilityFactory, PrismaService],
  controllers: [CompanyController],
  exports: []
})
export class CompanyModule { }
