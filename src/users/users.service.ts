import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService
    ){}

    // get a single user
    async getOne(email): Promise<any>{
        try{
                // Check for the user with the id
            const user = await this.prisma.user.findUnique({where:{
                email: email
            }});

            return user;
        }catch(error){
           console.log(error)
        }
        
    }
    
}
