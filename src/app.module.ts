import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ReservaModule } from './reserva/reserva.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      //port: 5432,
      //username: 'root',
      //password: '',
      //database: 'reservaciones',
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    AuthModule,
    ReservaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
