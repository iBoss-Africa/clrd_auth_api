import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";



export class UpdateCompanyDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly cacUrl: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly cacNo: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly country: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly state: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly city: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly streetAddress: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly postalCode: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly category: string;
}