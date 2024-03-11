import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";



export class UpdateCompanyDto {

    @ApiProperty()
    @IsString()
    readonly cacUrl: string;

    @ApiProperty()
    @IsString()
    readonly cacNo: string;

    @ApiProperty()
    @IsString()
    readonly country: string;

    @ApiProperty()
    @IsString()
    readonly state: string;

    @ApiProperty()
    @IsString()
    readonly city: string;

    @ApiProperty()
    @IsString()
    readonly streetAddress: string;

    @ApiProperty()
    @IsString()
    readonly postalCode: string;

    @ApiProperty()
    @IsString()
    readonly category: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly admin_id: any

}