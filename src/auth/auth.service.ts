import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { UserSignUpDto } from './dto/userSignup.dto';
import * as bcrypt from 'bcryptjs';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    // Signup users
    async Signup(userSignUpDto: UserSignUpDto ): Promise<{}>{

        try{
            // Extract the fields from the signuDto
            const {firstName, lastName, email, phone, password} = userSignUpDto;

            // check if the email already exist
            const user = await this.userService.getOne({email});
            if(user) throw new ConflictException('Email already exist!');

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
        
        }catch(error){
            if(error instanceof Error){
                throw new BadRequestException('Bad request', error.message);
            }
        }
    }


    // Login Users
    async login(loginDto: LoginDto){

        try{
            const {email, password} = loginDto;

            // check if the email already exist
            const user = await this.userService.getOne({email});
            if(!user){
                throw new NotFoundException('Invalid email or password');
            }
    
            // check if password is correct or not
            const isPasswordMatch =  await bcrypt.compare(password, user.password);
            
            if (!isPasswordMatch) {
                throw new UnauthorizedException('Invalid email or password');
            }
    
            // Generate token
            const token = await APIFeatures.assignJwtToken(user, this.jwtService);
    
            return { token, data: user }
        }catch(error){
            if(error instanceof Error){
                throw new BadRequestException('Bad request', error.message)
            }
        }
    }
}
