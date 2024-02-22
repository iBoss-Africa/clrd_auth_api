import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from "class-validator";



export class UserSignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
   readonly firstName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
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