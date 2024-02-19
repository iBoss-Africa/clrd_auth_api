import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from "class-validator";



export class UpdateCompanyDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
   readonly companyName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
   readonly country: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
   readonly state: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
   readonly city: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
   readonly streetAddress: string
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
   readonly category: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly postalCode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly cacUrl: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly cacNo: string;


}