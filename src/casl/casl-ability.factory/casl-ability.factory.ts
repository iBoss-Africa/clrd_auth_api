// casl-ability.factory.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
     const userWithRole = await prisma.user.findUnique({
        where: { id: userPayload.id },
        include: { role: true},
    });

    if (!userWithRole.role) {
      throw new UnauthorizedException('you dont have the neccessary permission to perform this operation yet.');
    }

    // if(id !== userPayload.id){
    //           throw new NotFoundException('Not found!')
    //     }

    const { can, cannot, build } = new AbilityBuilder(createPrismaAbility);

    // Define abilities based on user role or other criteria
    // Example: Admin can manage all users
    if (userWithRole.role.name === 'admin'){
      can(Actions.Manage, Subjects.User);
    } else {
      
      // Define abilities for other roles
      // Example: Regular users can only read their own profile
      can(Actions.Read, Subjects.User, { id: userPayload.id });
    }
    
    return build();
  }
}
