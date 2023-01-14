import { TypeOrmModule } from "@nestjs/typeorm";
import { Titulo } from "./entities/titulo.entity";
import { TituloService } from "./service/titulo.service";
import { TituloController } from "./controller/titulo.controller";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([Titulo])],
    providers:[TituloService],
    controllers:[TituloController],
    exports:[TypeOrmModule]
})

export class TituloModule { }