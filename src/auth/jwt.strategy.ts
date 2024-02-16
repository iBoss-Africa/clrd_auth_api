import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "./auth.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma.service'; // Import PrismaService



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService, // Inject PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //get the token from the request
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload){
   const {email} = payload   //Remember to extract the email instead of id!!!

   const user = await this.prismaService.user.findUnique({
    where: {
        email: email
    }
   })
    if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    
    return user;
  }
}