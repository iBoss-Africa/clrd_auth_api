import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { LoginSchema, RegisterUserSchema, userValidation } from 'src/utils/joi.validation';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        ){}

        // New user
    @Post('/')
    async signUp(
        @Body(new userValidation(RegisterUserSchema))
        signUpDto: SignUpDto,
    ): Promise<{token: string}>{
        const newUser =  this.authService.Signup(signUpDto)
        return newUser;
    }

    // Admin login
    @Post('/login')
    async login(
        @Body(new userValidation(LoginSchema))
        loginDto: LoginDto
    ): Promise<{ token:string}> {
        return  this.authService.login(loginDto)
    }
}
