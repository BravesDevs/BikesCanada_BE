import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { ConfigModule } from '@nestjs/config';
import { BikesService } from './bikes/bikes.service';
import { BikesModule } from './bikes/bikes.module';

@Module({
  imports: [ConfigModule.forRoot(), LocationModule, BikesModule],
  controllers: [],
  providers: [],
})

export class AppModule { }