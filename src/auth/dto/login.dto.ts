import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";


export class LoginDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email address'})
    readonly email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8,12)
    readonly password: string 
}