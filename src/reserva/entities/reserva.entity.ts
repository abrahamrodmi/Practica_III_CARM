import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('reservas')
export class Reserva {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column()
    codigoHabitacion!: number;

    @ApiProperty()
    @Column({ type: 'date' })
    checkIn!: Date;

    @ApiProperty()
    @Column({ type: 'date' })
    checkOut!: Date;

    @ApiProperty()
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precioTotal!: number;

    @ApiProperty()
    @Column({ nullable: true })
    comentarios?: string;

    @ApiProperty()
    @Column()
    userId!: number;

}