import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('usuarios')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column()
    name!: string;

    @ApiProperty()
    @Column({ unique: true })
    email!: string;

    @ApiProperty()
    @Column()
    password!: string;

}   