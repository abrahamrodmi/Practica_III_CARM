import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Reserva } from './entities/reserva.entity';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('reserva')
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateReservaDto })
  @ApiCreatedResponse({ type: Reserva, description: "Reserva creada exitosamente" })
  @ApiUnauthorizedResponse({ description: "No autorizado / Token inválido" })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post()
  async create(@Body() createReservaDto: CreateReservaDto, @Request() req: any) {
    const userId = req.user.sub;
    return this.reservaService.create(createReservaDto, userId);
  }

  @ApiOkResponse({ type: [Reserva], description: "Lista de todas las reservas" })
  @Get()
  findAll() {
    return this.reservaService.findAll();
  }

  @ApiOkResponse({ type: Reserva, description: "Información de la reserva solicitada" })
  @ApiNotFoundResponse({ description: "Reserva no encontrada" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservaService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiBody({ type: UpdateReservaDto })
  @ApiOkResponse({ type: Reserva, description: "Reserva modificada exitosamente" })
  @ApiNotFoundResponse({ description: "Reserva no encontrada" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.update(+id, updateReservaDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: "Reserva eliminada exitosamente" })
  @ApiNotFoundResponse({ description: "Reserva no encontrada" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservaService.remove(+id);
  }
}
