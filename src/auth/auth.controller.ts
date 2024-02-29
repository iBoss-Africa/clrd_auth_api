import { Body, Controller,Post,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        ){}

    // Admin login
    @Post('/login')
    async login(
        @Body()
        loginDto: LoginDto
    ): Promise<{ token:string}> {
        return  this.authService.login(loginDto);
    }

}
