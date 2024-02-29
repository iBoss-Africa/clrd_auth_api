import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreatePermissionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly subject: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly action: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly conditions: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly roleId: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly reason: string;
}
