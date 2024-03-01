import { Module, forwardRef } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PrismaService, CaslAbilityFactory],
  imports: [forwardRef(() => AuthModule)]
})
export class PermissionsModule { }
