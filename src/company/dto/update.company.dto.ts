import { ApiProperty } from "@nestjs/swagger";
import { companyCategory } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";



export class UpdateCompanyDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly cacUrl: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly cacNo: string;

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

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(companyCategory, {
        // message: 'Company Category must be one of these values: ' + Object.values(companyCategory).join(', '),
    })
    readonly category: companyCategory; 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly admin_id: any

}