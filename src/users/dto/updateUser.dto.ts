import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class UpdateUserDto {
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
    readonly avatar: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly driverLicenseUrl: string;

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