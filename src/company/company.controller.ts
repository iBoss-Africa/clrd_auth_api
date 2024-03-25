import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, SetMetadata, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateCompanyDto } from './dto/update.company.dto';
import { AuthGuard } from '@nestjs/passport';
import { CompanySignUpDto } from './dto/companySignup.dto';
import { Actions } from 'src/casl/actions.enum';
import { CanActAuthguard } from 'src/auth/guard/canact.auth.guard';
import { Subjects } from 'src/casl/subjects.enum';
import { lastValueFrom } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { JwtService } from '@nestjs/jwt';

@Controller('company')
export class CompanyController {
    private logger =new Logger()
    constructor(
        @Inject('CLRD_SERVICE')
        private client: ClientProxy,
        private userService: UsersService,
        private roleService: RolesService
    ) { }


    @Get()
    @UseGuards(AuthGuard(), CanActAuthguard)
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.Company)
    async getAll() {
        return this.client.send({ cmd: 'get-companies' }, {});
    }

    // @Get('/:id')
    // @SetMetadata('action', Actions.Read)
    // @SetMetadata('subject', Subjects.User)
    // async getOne(
    //     @Param('id') id: string
    // ) {
    //     const numericId = parseInt(id, 10);
    //     return this.companyService.getOne({ id: numericId })
    // }

    @Post()
    async create(
        @Body()
        companySignUpDto: CompanySignUpDto,
    ) {
        const resp = await this.client.send({ cmd: 'create-company' }, companySignUpDto);
        const { companyData } = await lastValueFrom(resp);
        const token = await this.signupCompany(companyData, companySignUpDto);
        return { id: companyData.id, token }

    }

    @Patch('/:id')
    @UseGuards(AuthGuard(), CanActAuthguard)
    @SetMetadata('action', Actions.Update)
    @SetMetadata('subject', Subjects.Company)
    async updateOne(
        @Param('id') id: string, //company id
        @Body()
        updateCompanyDto: UpdateCompanyDto,

    ) {
        return this.client.send({ cmd: 'update-company' }, { id, companyData: updateCompanyDto });
    }

    @Put('/restore/:id')
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.User)
    async restore(
        @Param('id') id: string,
    ) {
        return this.client.send({ cmd: 'restore-company' }, { id });
        ;
    }

    @Delete('/trash/:id')
    @SetMetadata('action', Actions.Manage)
    @SetMetadata('subject', Subjects.User)
    async softDelete(
        @Param('id')
        id: string,
    ) {
        return this.client.send({ cmd: 'delete-company' }, { id });
    }

    // // Permanent Delete
    // @Delete('delete')
    // @SetMetadata('action', Actions.Delete)
    // @SetMetadata('subject', Subjects.User)
    // @UseGuards(AuthGuard(), CanActAuthguard)
    // async Delete(
    //     @Body() requestBody: any,
    // ) {
    //     return this.companyService.delete(requestBody.ids)
    // }

    async signupCompany(companyData, companySignUpDto: CompanySignUpDto) {
        const { email, id: companyId } = companyData;
        const companyRole = await this.roleService.view({ name: Subjects.Company.toLowerCase() });
        const user = await this.userService.Signup({
            email, companyId, password: companySignUpDto.password, roleId: companyRole.id,
            firstName: '',
            lastName: '',
            phone: ''
        });
        return APIFeatures.assignJwtToken({ id: user.id, email: user.email }, new JwtService);
    }
}
