// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory/casl-ability.factory';
import { Actions } from '../../casl/actions.enum';
import { Subjects } from '../../casl/subjects.enum';

@Injectable()
export class Authguard implements CanActivate {
  constructor(
    private reflector: Reflector, 
    private caslAbilityFactory: CaslAbilityFactory) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().user;
    const ability = await this.caslAbilityFactory.createForUser(user);

    const requiredAction = this.reflector.get<Actions>('action', context.getHandler());
    const requiredSubject = this.reflector.get<Subjects>('subject', context.getHandler());

    return ability.can(requiredAction, requiredSubject, user);
  }
}
