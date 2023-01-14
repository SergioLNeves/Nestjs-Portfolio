import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Portfolio } from "./entities/portfolio.entity";
import { PortfolioService } from "./service/portfolio.service";
import { PortfolioController } from "./controller/portfolio.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Portfolio])],
    providers:[PortfolioService],
    controllers:[PortfolioController],
    exports:[TypeOrmModule]
})

export class PortfolioModule { }