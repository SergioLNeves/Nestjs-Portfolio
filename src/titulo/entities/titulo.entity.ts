import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Portfolio } from "../../portfolio/entities/portfolio.entity";

@Entity({name: "tb_titulo"})
    export class Titulo{
        @PrimaryGeneratedColumn()
        @ApiProperty()
        id: number 

        @IsNotEmpty()
        @MaxLength(100)
        @Column({length: 100, nullable: false})
        @ApiProperty()
        descricaoTitulo: string

        @ApiProperty({ type: () => Portfolio })
        @OneToMany(() => Portfolio, (portfolio) => portfolio.titulo)
        portfolio: Portfolio[]

}