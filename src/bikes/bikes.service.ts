import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BikeType } from './interfaces/bike.interface';
import { LocationType } from 'src/location/interfaces/location.interface';

@Injectable()
export class BikesService {
    constructor(private prisma: PrismaService) { }

    async getBikeById(bike_model: string): Promise<BikeType | null> {
        try {
            return await this.prisma.bikes.findUnique({
                where: {
                    bike_model: bike_model
                },
                include: {
                    location: {
                        select: {
                            street: true,
                            city: true,
                            province: true,
                        }
                    }
                }
            });
        }
        catch (err) {
            throw err;
        }
    }

    async bookBike(bike_model: string, user_id: number, location_id: number): Promise<String> {
        try {
            const result = await this.prisma.$queryRaw`call place_booking(${bike_model}, ${user_id}, ${location_id})`;
            return 'success'
        }
        catch (err) {
            if (err.code == 'P2010') {
                throw new ForbiddenException('Bike is not available');
            }
            throw err;
        }
    }

    async dropOffBike(booking_id: number, location_id: number): Promise<String> {
        try {
            const result = await this.prisma.$queryRaw`call return_bike(${booking_id}, ${location_id})`;
            return 'success'
        }
        catch (err) {
            throw err;
        }
    }
}