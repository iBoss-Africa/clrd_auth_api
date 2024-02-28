import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PermissionsService {
    constructor(private prisma: PrismaService) { }

    async create(createPermissionDto: CreatePermissionDto) {
        return this.prisma.permission.create({ data: createPermissionDto });
    }

    async findAll(criteria: Object) {
        return this.prisma.permission.findMany({ where: criteria });
    }

    async findOne(id: number) {
        return this.prisma.permission.findUnique({ where: { id } });
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto) {
        return this.prisma.permission.update({
            where: { id },
            data: updatePermissionDto
        });
    }

    async remove(id: number) {
        const permission = await this.prisma.permission.findUnique({ where: { id } });
        if (!permission) throw new HttpException('Permisson not found', HttpStatus.NOT_FOUND);
        return this.prisma.permission.delete({ where: { id } });
    }

    async getRolePermissions(roleId: number) {
        return this.findAll({ roleId });
    }
}
