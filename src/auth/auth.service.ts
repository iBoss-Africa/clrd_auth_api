import {  Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { LoginDto } from './dto/login.dto';
import { CustomLogger } from 'src/customLogger';


@Injectable()
export class AuthService {
    constructor(
        private readonly customLogger: CustomLogger,
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {

        try{
            const { email, password } = loginDto;
            const user = await this.userService.getOne({ email });
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                throw new UnauthorizedException('Invalid email or password');
            }

            

            // const mail = await Email.welcomeMail( user.email, user.firstName)
            const token = await APIFeatures.assignJwtToken(user, this.jwtService);

            return { token, data: user }
        }catch(error){
            this.customLogger.debug(`Generated JWT Token with payload ${JSON.stringify({email: loginDto.email})}`, error.stack)
            throw new InternalServerErrorException();
        }
    }
}
