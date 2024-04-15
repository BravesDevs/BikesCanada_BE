import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class CreateLocationRequest {
    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    zip: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    province: string;
}