import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { RolesController } from './roles.controller';
import { PermissionsService } from 'src/permissions/permissions.service';
import { AuthModule } from 'src/auth/auth.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService, UsersService, PrismaService, PermissionsService, CaslAbilityFactory],
  imports: [forwardRef(() => AuthModule),forwardRef(() => MailModule)],
  exports: [RolesService]
})
export class RolesModule { }
