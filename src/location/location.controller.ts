import { Controller, Post, Req, Body, Get } from '@nestjs/common';
import { CreateLocationRequest } from './dto/create-location.dto';
import { LocationService } from './location.service';
import { LocationType } from './interfaces/location.interface';
import { BikeType } from 'src/bikes/interfaces/bike.interface';

@Controller('location')
export class LocationController {
    constructor(private _locationService: LocationService) { }
    @Post()
    async create(@Body() data: CreateLocationRequest): Promise<LocationType> {
        return this._locationService.addLocationService(data);
    }

    @Get()
    async getAll(): Promise<LocationType[]> {
        return this._locationService.getAllLocations();
    }

    @Get('available-bikes/:location_id')
    async getAvailableBikes(@Req() req): Promise<BikeType[]> {
        return this._locationService.getLocationAvailableBikes(parseInt(req.params.location_id));
    }
}

