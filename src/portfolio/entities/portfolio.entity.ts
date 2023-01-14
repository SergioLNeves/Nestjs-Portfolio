import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Titulo } from "../../titulo/entities/titulo.entity";

@Entity({name: "tb_portfolio"})
    export class Portfolio{
        @PrimaryGeneratedColumn()
        @ApiProperty()
        id: number 

        @MaxLength(5000)
        @Column({length: 5000, nullable: true})
        @ApiProperty()
        fotoPortfolio:string

        @MaxLength(5000)
        @Column({length: 5000, nullable: true})
        @ApiProperty()
        nomePortfolio:string

        @MaxLength(5000)
        @Column({length: 5000, nullable: true})
        @ApiProperty()
        linkPortfolio:string

        @ApiProperty({ type: () => Titulo })
        @ManyToOne (() => Titulo, (titulo) => titulo.portfolio, {
            onDelete: "CASCADE"
        })
        titulo: Titulo
}