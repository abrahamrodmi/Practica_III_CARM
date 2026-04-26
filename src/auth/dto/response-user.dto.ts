import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
    @ApiProperty()
    id!: number;
     @ApiProperty()
    email!: string;
}