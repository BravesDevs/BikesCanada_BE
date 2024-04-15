import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BikesService } from './bikes.service';
import { BikeType } from './interfaces/bike.interface';
import { BikeDropRequest, BookBikeRequest } from './dto/bike.dto';

@Controller('bikes')
export class BikesController {
    constructor(private readonly bikesService: BikesService) { }

    @Get(':bike_model')
    async getBikeById(@Param('bike_model') bike_model: string): Promise<BikeType> {
        return this.bikesService.getBikeById(bike_model);
    }

    @Post('book-bike')
    async bookBike(@Body() data: BookBikeRequest): Promise<String> {
        return this.bikesService.bookBike(data.bike_model, data.user_id, data.location_id);
    }

    @Post('drop-bike')
    async dropBike(@Body() data: BikeDropRequest): Promise<String> {
        return this.bikesService.dropOffBike(data.booking_id, data.location_id);
    }

}
