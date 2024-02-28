// casl-ability.factory.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AbilityBuilder, Ability } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { Actions } from '../actions.enum';
import { Subjects } from '../subjects.enum';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CaslAbilityFactory {
    async createForUser(userPayload: User) {

        // Fetch the user's role from the database
        const user = await prisma.user.findUnique({
            where: { id: userPayload.id },
            include: { role: true },
        });

        if (!user.role) {
            throw new UnauthorizedException('You don\'t have the privileges to perform this operation.');
        }

        const { can, build } = new AbilityBuilder(createPrismaAbility);

        if (user.role.name === 'admin') {
            can(Actions.Manage, Subjects.All);
        } else {
            can(Actions.Read, Subjects.User, { id: userPayload.id });
        }
        return build();
    }
}
