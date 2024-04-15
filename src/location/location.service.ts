import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateLocationRequest } from './dto/location.dto';
import { LocationType } from './interfaces/location.interface';
import { PrismaService } from '../prisma.service';
import { BikeType } from 'src/bikes/interfaces/bike.interface';
@Injectable()
export class LocationService {
    constructor(private prisma: PrismaService) { }
    async addLocationService(data: CreateLocationRequest): Promise<LocationType> {
        try {
            const isExists = await this.prisma.location.findFirst({
                where: {
                    street: data.street,
                    zip: data.zip,
                    city: data.city,
                    province: data.province
                }
            });
            if (isExists) {
                throw new ForbiddenException('Location already exists');
            }


            const result = await this.prisma.location.create({
                data: {
                    street: data.street,
                    zip: data.zip,
                    city: data.city,
                    province: data.province
                }
            });

            return result;

        }
        catch (err) {
            if (err instanceof ForbiddenException) {
                throw err;
            }
        }
    }

    async getAllLocations(): Promise<LocationType[]> {
        return this.prisma.location.findMany({
            orderBy: {
                location_id: 'asc'
            }
        });
    }

    async getLocationAvailableBikes(location_id: number): Promise<BikeType[]> {
        return this.prisma.bikes.findMany({
            where: {
                bike_location: location_id,
                is_available: true,
                is_maintained: true
            },
            select: {
                bike_model: true,
                bike_type: true,
                weight: true,
                is_child_safe: true,
                is_maintained: true
            }
        })
    }
}
