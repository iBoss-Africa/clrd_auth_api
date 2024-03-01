import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

export const RegisterUserSchema = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email: Joi.string().email().required(),
    phone:Joi.string().required(),
    password: Joi.string().required(),
    id: Joi.any(),
    createdAt: Joi.any(),
    updatedAt: Joi.any(),
    role: Joi.any(),
    isDeleted: Joi.any()
}).options({
    abortEarly: false,
   });

  //  Login Validation
export const companySchema = Joi.object({
    companyName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone:Joi.string().required(),

}).options({
    abortEarly: false,
  });

  //  chage Password Validation
export const ChangePasswordSchema = Joi.object({
    oldpPassword: Joi.string().required(),
    newPassword: Joi.string().required()
}).options({
    abortEarly: false,
  });

  //   ourService Validation
export const OurServiceSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string().uri(),
    id: Joi.any(),
    email: Joi.any(),
    name: Joi.any(),
    password: Joi.any(),
    createdAt: Joi.any(),
    updatedAt: Joi.any(),
    role: Joi.any(),
    isDeleted: Joi.any()

}).options({
    abortEarly: false,
  });

  //   Update ourService Validation
export const UpdateOurServiceSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string().uri(),
    
    
}).options({
    abortEarly: false,
  });

  export const subscriberSchema = Joi.object({
    email: Joi.string().email().required(),
}).options({
    abortEarly: false,
   });


@Injectable()
export class userValidation implements PipeTransform {
    constructor(private readonly schema: Joi.ObjectSchema){}

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value, { abortEarly: false });
     
        if (error) {
          throw new BadRequestException('Validation failed', error.stack);
      }
        return value;
    }
}