import { Body, Controller, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignUpDto } from './dto/userSignup.dto';
import { LoginDto } from './dto/login.dto';
import  {Actions} from '../casl/actions.enum';
// import Subjects from '../casl/subjects.enum';
import { SetMetadata } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { User, Company} from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { CanActAuthguard } from './guard/canact.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        ){}

    // New user
    @Post('/')
    async signUp(
        @Body() userSignUpDto: UserSignUpDto,
    ): Promise<{}>{
        return this.authService.Signup(userSignUpDto);
    }

    // Admin login
    @Post('/login')
    async login(
        @Body()
        loginDto: LoginDto
    ): Promise<{ token:string}> {
        return  this.authService.login(loginDto);
    }
}
