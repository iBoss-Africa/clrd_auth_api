import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';



export default class APIFeatures{
    
    static async assignJwtToken(
        user: User,
        jwtService: JwtService
    ): Promise<string>{

        const payload = { 
            id: user.id,
            email: user.email
        };
        const token = await jwtService.sign(payload);

        return token;
    }
}