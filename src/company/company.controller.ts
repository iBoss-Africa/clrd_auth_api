import { Body, Controller, Delete, Get, Param, Patch, Post, Put,UseGuards, SetMetadata} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company, User } from '@prisma/client';
import { UpdateCompanyDto } from './dto/update.company.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CompanySignUpDto } from './dto/companySignup.dto';
import { Actions } from 'src/casl/actions.enum';
import { CanActAuthguard } from 'src/auth/guard/canact.auth.guard';
import { Subjects } from 'src/casl/subjects.enum';

@UseGuards(AuthGuard(),CanActAuthguard)
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService){}

    
    @Get()
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.User)
    async getAll(){
        return this.companyService.getAll();
    }

    @Get('/:id')
    @SetMetadata('action', Actions.Read)
    @SetMetadata('subject', Subjects.User)
    async getOne(
        @Param('id') id:string
    ){
        const numericId = parseInt(id,  10);
        return this.companyService.getOne({id: numericId})
    }

    @Post()
    async create(
        @Body()
        companySignUpDto: CompanySignUpDto, 
    ){
        return this.companyService.create(companySignUpDto)
    }

    @Patch('/:id')
    // @UseGuards(AuthGuard())
    async updateOne(
        @Param('id')id: string, //company id
        @Body()
        updateCompanyDto: UpdateCompanyDto,
        
    ){
        return this.companyService.updateOne( parseInt(id), updateCompanyDto)
    }

    @Put('/restore/:id')
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.User)
    async restore(
        @Param('id')id: string,
    ){
        return this.companyService.restoreCompany(parseInt(id));
    }

    @Delete('/trash/:id')
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.User)
    async softDelete(
        @Param('id')
        id: string,
    ){
        return this.companyService.softDelete(parseInt(id));
    }

    // Permanent Delete
    @Delete('delete')
    @SetMetadata('action', Actions.Delete)
    @SetMetadata('subject', Subjects.User)
    @UseGuards(AuthGuard(),CanActAuthguard)
    async Delete(
        @Body() requestBody: any,
    ) {
        return this.companyService.delete(requestBody.ids)
    }
}
