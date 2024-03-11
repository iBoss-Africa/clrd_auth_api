import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [CaslAbilityFactory, UsersService, PrismaService, JwtService],
  exports: [UsersService],
  controllers: [UsersController],

})
export class UsersModule { }
