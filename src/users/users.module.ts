import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [CaslAbilityFactory, UsersService,MailService, PrismaService, JwtService],
  exports: [UsersService],
  controllers: [UsersController],

})
export class UsersModule { }
