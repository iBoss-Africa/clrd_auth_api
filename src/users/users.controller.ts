import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UpdateCompanyDto } from './dto/update.company.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

  
    // @Patch('/company/:id')
    // @UseGuards(AuthGuard())
    // async updateCompany(
    //     @Body()
    //     @Param('id')id: string,
    //     updateCompanyDto: UpdateCompanyDto,
    //     @CurrentUser() user: User
    // ){
    //     return this.usersService.updateCompany(parseInt(id), updateCompanyDto, user)
    // }
}
