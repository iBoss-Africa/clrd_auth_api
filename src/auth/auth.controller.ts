import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import  {Actions} from '../casl/actions.enum';
// import Subjects from '../casl/subjects.enum';
import { SetMetadata } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UpdateuserDto } from 'src/users/dto/updateUser.dto';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Authguard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
        ){}

        // New user
    @Post('/')
    
    async signUp(
        @Body()
        signUpDto: SignUpDto,
        @CurrentUser() user: User
    ): Promise<{}>{
        return this.authService.Signup(signUpDto);
    }

    // Admin login
    @Post('/login')
    async login(
        @Body()
        loginDto: LoginDto
    ): Promise<{ token:string}> {
        return  this.authService.login(loginDto);
    }

    // Update user
    @Patch('/:id')
    @SetMetadata('action', Actions.Create)
    @UseGuards(AuthGuard(),Authguard)
    async updateUser(
        @Body()
        @Param('id')id: string,
        updateUserDto: UpdateuserDto,
        @CurrentUser() user: User
    ){
        return this.usersService.updateUser(parseInt(id), updateUserDto, user)
    }
}
