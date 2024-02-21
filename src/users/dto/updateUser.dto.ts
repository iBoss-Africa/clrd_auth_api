import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, Length } from "class-validator";



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

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly driverLicense: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly driverLicenseNo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly country: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly state: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly streetAddress: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly postalCode: string;

}