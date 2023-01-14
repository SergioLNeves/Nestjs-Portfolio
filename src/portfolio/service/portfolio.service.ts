import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Portfolio } from "../entities/portfolio.entity";

@Injectable()
export class PortfolioService {
    
    constructor(
        @InjectRepository(Portfolio)
        private PortfolioRepository: Repository<Portfolio>
        ){}

     //Get All
        async findAll(): Promise<Portfolio[]>{
            return await this.PortfolioRepository.find({
                relations:{
                    titulo: true
                },
            })
        }

     //Get por ID
        async findById(id: number): Promise<Portfolio>{
            let portfolio = await this.PortfolioRepository.findOne({
                where: {
                    id
                }, relations:{
                    titulo:true
                }
            }) 

            if (!portfolio)
            throw new HttpException('Portfolio não existe',HttpStatus.NOT_FOUND)

            return portfolio

        }
        

    //Create linha
        async create(portfolio: Portfolio): Promise<Portfolio>{
            return this.PortfolioRepository.save(portfolio)
        }

    //Alteração linha
        async update(portfolio: Portfolio): Promise<Portfolio>{
            let buscarPortfolio = await this.findById(portfolio.id)

            if(!buscarPortfolio || !portfolio.id)
            throw new HttpException('Portfolio Não Existe',HttpStatus.NOT_FOUND)

            return await this.PortfolioRepository.save(portfolio)
        }

    //Deletar linha
        async delete(id:number): Promise <DeleteResult>{
            let buscarPortfolio = await this.findById(id)

            if(!buscarPortfolio)
                throw new HttpException('Portfolio Não Encontrada', HttpStatus.NOT_FOUND)

                return await this.PortfolioRepository.delete(id)
        }
    }