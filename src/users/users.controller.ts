import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { UpdateCompanyDto } from './dto/update.company.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    // @UseGuards(AuthGuard)
    @Patch('/:id')
    async updateCopany(
        @Body()
        @Param('id')id: string,
        updateCompanyDto: UpdateCompanyDto,
        @CurrentUser() user: User
    ){
        return this.usersService.updateCompany(parseInt(id), updateCompanyDto, user)
    }
}
