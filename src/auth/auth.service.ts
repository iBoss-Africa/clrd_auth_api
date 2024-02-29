import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }


    async login(loginDto: LoginDto) {

        try {
            const { email, password } = loginDto;

            // check if the email already exist
            const user = await this.userService.getOne({ email });
            if (!user) {
                throw new NotFoundException('Invalid email or password');
            }

            // check if password is correct or not
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                throw new UnauthorizedException('Invalid email or password');
            }

            // Generate token
            const token = await APIFeatures.assignJwtToken(user, this.jwtService);

            return { token, data: user }
        } catch (error) {
            if (error instanceof Error) {
                throw new BadRequestException('Bad request', error.message)
            }
        }
    }

}