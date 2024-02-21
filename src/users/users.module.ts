import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersService,PrismaService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}