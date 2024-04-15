import { Module } from '@nestjs/common';
import { BikesController } from './bikes.controller';

@Module({
  controllers: [BikesController]
})
export class BikesModule {}
