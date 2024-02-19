import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from "class-validator";



export class UpdateuserDto {
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
    @IsString()
    readonly phone: string;
}