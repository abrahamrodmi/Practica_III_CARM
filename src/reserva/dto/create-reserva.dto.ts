import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateReservaDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    codigoHabitacion!: string;

    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    checkIn!: Date;

    @ApiProperty()
    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    checkOut!: Date;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    precioTotal!: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    comentarios?: string;
}
