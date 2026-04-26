import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ReservaModule } from './reserva/reserva.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: { rejectUnauthorized: false },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ReservaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
