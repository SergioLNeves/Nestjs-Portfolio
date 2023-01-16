import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: "tb_postagem"})
    export class Postagem{
        @PrimaryGeneratedColumn()
        @ApiProperty()
        id: number 

        @IsNotEmpty()
        @MaxLength(100)
        @Column({length: 100, nullable: false})
        @ApiProperty()
        titulo: string

        @IsNotEmpty()
        @MaxLength(450)
        @Column({length: 450, nullable: false})
        @ApiProperty()
        texto: string

        @ApiProperty({ type: () => Usuario })
        @ManyToOne (() => Usuario, (usuario) => usuario.postagem, {
            onDelete: "CASCADE"
        })
        usuario: Usuario
}