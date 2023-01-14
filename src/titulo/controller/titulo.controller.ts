import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Titulo } from "../entities/titulo.entity";
import { TituloService } from "../service/titulo.service";

@ApiTags('Titulo')
@UseGuards(JwtAuthGuard)
@Controller("/titulo")
@ApiBearerAuth()
export class TituloController{
    constructor(private readonly TituloService: TituloService){}

    //Puxa todos os dados da tabela
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Titulo[]>{
        return this.TituloService.findAll();
    }

    //Utiliza o ID para encontrar a linha
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe) id:number): Promise<Titulo>{
        return this.TituloService.findById(id)
    }

    //Incluir linha de informação 
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() titulo: Titulo): Promise<Titulo>{
        return this.TituloService.create(titulo)
    }

    //Alteração na linha de informação
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() titulo: Titulo): Promise<Titulo>{
        return this.TituloService.update(titulo)
    }

    //Deletar linha de informação por meio da PK "ID"
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.TituloService.delete(id)
    }
}