import { Body, Controller, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company, User } from '@prisma/client';
import { UpdateCompanyDto } from './dto/update.company.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CompanySignUpDto } from './dto/companySignup.dto';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService){}

    @Get()
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
}
