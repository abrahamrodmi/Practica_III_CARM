import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './entities/reserva.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) { }
  async create(createReservaDto: CreateReservaDto, userId: number) {
    // Crear instancia y agregar el userId
    const nuevaReserva = this.reservaRepository.create({
      userId: userId,
      codigoHabitacion: Number(createReservaDto.codigoHabitacion),
      checkIn: createReservaDto.checkIn,
      checkOut: createReservaDto.checkOut,
      precioTotal: createReservaDto.precioTotal,
      comentarios: createReservaDto.comentarios,
    });

    // guardar en la base de datos
    return await this.reservaRepository.save(nuevaReserva);
  }

  async findAll() {
    return this.reservaRepository.find();
  }

  async findOne(id: number) {
    const reserva = await this.reservaRepository.findOneBy({ id });
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }
    return reserva;
  }

  async update(id: number, updateReservaDto: UpdateReservaDto) {
    const reserva = await this.findOne(id);
    // Convertir codigoHabitacion a número 
    if (updateReservaDto.codigoHabitacion) {
      updateReservaDto.codigoHabitacion = Number(updateReservaDto.codigoHabitacion) as any;
    }
    Object.assign(reserva, updateReservaDto);
    return this.reservaRepository.save(reserva);
  }

  async remove(id: number) {
    const reserva = await this.findOne(id);
    await this.reservaRepository.remove(reserva);
    return { message: `Reserva con ID ${id} eliminada exitosamente` };
  }
}
