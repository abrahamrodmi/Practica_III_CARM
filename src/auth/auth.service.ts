import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class AuthService {

  //Para usar  registrar en la base de datos
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService) {

  }

  async create(createUserDto: CreateUserDto) {
    //Desestructurar
    const numRound = 10;

    const { email, password } = createUserDto;
    //verificar que no existe usuario
    const emailExist = await this.userRepository.findOneBy({ email });
    if (emailExist) {
      const error = {
        "statusCode": 400,
        "error": "conflict",
        "message": ["El email ya existe"]
      }
      //Si se cumple  el usuario existe en la DB
      throw new ConflictException(error);
    }
    //encriptar  el password
    const hashPassword = await bcrypt.hash(password, numRound);
    createUserDto.password = hashPassword;
    //guardar
    const savedUser = await this.userRepository.save(createUserDto);
    return { id: savedUser.id, email: savedUser.email } as ResponseUserDto;
  }

  async login(LoginUserDto: LoginUserDto) {
    //Desestructurar
    const { email, password } = LoginUserDto;
    //Verificar que el email existe
    const emailExist = await this.userRepository.findOneBy({ email });
    if (!emailExist) {
      const error = {
        "statusCode": 401,
        "error": "Not Found",
        "message": ["El usuario no existe"]
      }
      throw new NotFoundException(error)
    }
    //Comparar que pw sean iguales
    const matchPassword = await bcrypt.compare(password, emailExist.password);
    if (!matchPassword) {
      const error = {
        "statusCode": 404,
        "error": "Unauthorized exception",
        "message": ["Password incorrecto"]
      }
      throw new UnauthorizedException(error);
      //Si son iguales retornar jwt
    }
    const payload = {
      sub: emailExist.id,
      name: emailExist.name,
      email: emailExist.email
    }

    const token = await this.jwtService.signAsync(payload)
    return {
      token,

    };    
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return users.map(user => ({ id: user.id, email: user.email }));
  }

}
