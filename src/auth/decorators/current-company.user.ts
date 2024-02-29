import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Company } from '@prisma/client';

export const CurrentCompany = createParamDecorator(
    (data, context: ExecutionContext): Company=>{
        const req = context.switchToHttp().getRequest(); //the request data is gotten here
        return req.company;
    }
)