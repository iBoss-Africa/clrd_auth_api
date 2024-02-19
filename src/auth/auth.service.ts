import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async Signup(signUpDto: SignUpDto): Promise<{}>{
        // Extract the fields from the signuDto
        const {firstName, lastName, email, phone, password} = signUpDto;

        // check if the email already exist
        const isExist = await this.userService.getOne({email});

        if(isExist) throw new ConflictException('Email already exist!')

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Creating the new user
        const newUser = await this.prisma.user.create({
            data: {
                firstName, 
                lastName, 
                email, 
                phone, 
                password: hashPassword
            }
        });

        // Generate token
        const token = await APIFeatures.assignJwtToken(newUser, this.jwtService);

        return {token, data: newUser};
    }

    async login(loginDto: LoginDto){
        const {email, password} = loginDto;

        // check if the email already exist
        const isExist = await this.userService.getOne({email});

        if(!isExist){
            throw new NotFoundException('Invalid email or password')
        }

        // check if password is correct or not
        const isPasswordMatch =  await bcrypt.compare(password, isExist.password);
        
        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // Generate token
        const token = await APIFeatures.assignJwtToken(isExist, this.jwtService);

        return { token, data: isExist }
    }
}
