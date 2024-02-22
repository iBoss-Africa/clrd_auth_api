import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [CaslAbilityFactory,UsersService,PrismaService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
