import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";



export class UserSignUpDto {
    @ApiProperty()
    @IsString()
    readonly firstName: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly lastName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email address' })
    readonly email: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8)
    readonly password: string

    @ApiProperty()
    @IsOptional()
    @IsInt()
    readonly roleId: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    readonly companyId: number
}