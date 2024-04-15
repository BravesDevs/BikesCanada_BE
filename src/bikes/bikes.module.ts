import { Module } from '@nestjs/common';
import { BikesController } from './bikes.controller';
import { PrismaService } from 'src/prisma.service';
import { BikesService } from './bikes.service';

@Module({
  controllers: [BikesController],
  providers: [PrismaService, BikesService],
})
export class BikesModule { }
