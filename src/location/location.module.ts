import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [LocationController],
    providers: [PrismaService, LocationService]
})
export class LocationModule { }
