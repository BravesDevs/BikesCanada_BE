import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), LocationModule],
  controllers: [],
  providers: [],
})

export class AppModule { }