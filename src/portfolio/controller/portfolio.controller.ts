import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { PortfolioService } from "../service/portfolio.service";
import { Portfolio } from "../entities/portfolio.entity";

@ApiTags('Portfolio')
@UseGuards(JwtAuthGuard)
@Controller("/portfolio")
@ApiBearerAuth()
export class PortfolioController{
    constructor(private readonly PortfolioService: PortfolioService){}

    //Puxa todos os dados da tabela
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Portfolio[]>{
        return this.PortfolioService.findAll();
    }

    //Utiliza o ID para encontrar a linha
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe) id:number): Promise<Portfolio>{
        return this.PortfolioService.findById(id)
    }

    //Incluir linha de informação 
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() portfolio: Portfolio): Promise<Portfolio>{
        return this.PortfolioService.create(portfolio)
    }

    //Alteração na linha de informação
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() portfolio: Portfolio): Promise<Portfolio>{
        return this.PortfolioService.update(portfolio)
    }

    //Deletar linha de informação por meio da PK "ID"
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.PortfolioService.delete(id)
    }
}