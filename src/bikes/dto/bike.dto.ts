import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

enum BikeType {
    ROAD = 'ROAD',
    MOUNTAIN = 'MOUNTAIN',
    CITY = 'CITY',
    BMX = 'BMX',
    KIDS = 'KIDS'
}

export class CreateBikeRequest {
    @IsString()
    @IsNotEmpty()
    bike_model: string;

    @IsString()
    @IsNotEmpty()
    bike_type: BikeType;

    @IsString()
    @IsNotEmpty()
    is_child_safe: boolean;

    @IsNotEmpty()
    @IsNumber()
    bike_location: number;
}

export class UpdateBikeRequest {
    @IsOptional()
    @IsNumber()
    bike_location: number;

    @IsOptional()
    @IsBoolean()
    is_available: boolean;

    @IsOptional()
    @IsBoolean()
    is_maintained: boolean;
}

export class BookBikeRequest {
    @IsString()
    @IsNotEmpty()
    bike_model: string;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    location_id: number;
}

export class BikeDropRequest {
    @IsNumber()
    @IsNotEmpty()
    booking_id: number;

    @IsNumber()
    @IsNotEmpty()
    location_id: number;
}