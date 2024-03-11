import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";



export class CompanySignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly companyName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email address' })
    readonly email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly password: string;



}