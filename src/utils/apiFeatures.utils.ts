import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';



export default class APIFeatures{
    
    static async assignJwtToken(
        user: User,
        jwtService: JwtService
    ): Promise<string>{

        const payload = { 
            id: user.id, 
            email: user.email, 
            firstName: user.firstName, 
            lastName:user.lastName,
            phone: user.phone
        };
        const token = await jwtService.sign(payload);

        return token;
    }
}