import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';



export default class APIFeatures {
    @Inject(ConfigService)
    static async assignJwtToken(
        user: { id: number, email: string },
        jwtService: JwtService
    ): Promise<string> {
        const payload = {
            id: user.id,
            email: user.email
        };
        const config = new ConfigService();
        const token = jwtService.sign(payload, { secret: config.get<string>('JWT_SECRET') });
        return token;
    }
}