import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";



export class UserSignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
   readonly firstName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
   readonly lastName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email address'})
    readonly email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8)
    readonly password: string 

}