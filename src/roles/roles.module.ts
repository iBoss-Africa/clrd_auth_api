import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { RolesController } from './roles.controller';

@Module({
  controllers: [RolesController],
  providers: [RolesService, UsersService, PrismaService],
})
export class RolesModule { }
