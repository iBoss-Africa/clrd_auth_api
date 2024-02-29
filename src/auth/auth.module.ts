import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports:[
    // Setting up JWT
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
    // injecting the config seting
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        // Do not use process.env here, it will read undefined.
        secret: config.get<string>('jwt_secret'),
        signOptions: {
          expiresIn: config.get<string>('jwt_expires'),
        },
      };
    }
  }), 
    forwardRef(() => UsersModule),
    forwardRef(() => RolesModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService,JwtStrategy],
  exports: [AuthService, JwtStrategy, PrismaService, PassportModule]
})

export class AuthModule {}
