import { Body, Controller,InternalServerErrorException,Post,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CustomLogger } from 'src/customLogger';

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
