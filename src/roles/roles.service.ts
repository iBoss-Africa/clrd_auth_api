import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService, private userService: UsersService) { }

    async create(roleDto: RoleDto) {
        return this.prisma.role.create({ data: roleDto });
    }

    async findAll() {
        return this.prisma.role.findMany();
    }

    async findOne(id: number) {
        return `This action returns a #${id} role`;
    }

    async update(id: number, role: RoleDto) {
        return this.prisma.role.update({
            where: { id },
            data: role
        });
    }

    async remove(id: number) {
        const [role, user] = await Promise.all([
            this.findOne(id),
            this.userService.getOne({ roleId: id })
        ]);
        if (!role) throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        if (user) throw new HttpException('You can\'t delete this role because one or more users have it', HttpStatus.NOT_ACCEPTABLE);
        return this.prisma.role.delete({ where: { id } });
    }
}
