import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { ConfigModule } from '@nestjs/config';
import { BikesService } from './bikes/bikes.service';
import { BikesModule } from './bikes/bikes.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [ConfigModule.forRoot(), LocationModule, BikesModule, BillingModule],
  controllers: [],
  providers: [],
})

export class AppModule { }