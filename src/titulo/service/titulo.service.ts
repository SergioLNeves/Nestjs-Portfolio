import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Titulo } from "../entities/titulo.entity";

@Injectable()
export class TituloService {
    
    constructor(
        @InjectRepository(Titulo)
        private TituloRepository: Repository<Titulo>
        ){}

     //Get All
        async findAll(): Promise<Titulo[]>{
            return await this.TituloRepository.find({
                relations:{
                    portfolio: true
                },
            })
        }

     //Get por ID
        async findById(id: number): Promise<Titulo>{
            let Titulo = await this.TituloRepository.findOne({
                where: {
                    id
                }, relations:{
                    portfolio:true
                }
            }) 

            if (!Titulo)
            throw new HttpException('Titulo não existe',HttpStatus.NOT_FOUND)

            return Titulo

        }
        

    //Create linha
        async create(titulo: Titulo): Promise<Titulo>{
            return this.TituloRepository.save(titulo)
        }

    //Alteração linha
        async update(titulo: Titulo): Promise<Titulo>{
            let buscarTitulo = await this.findById(titulo.id)

            if(!buscarTitulo || !titulo.id)
            throw new HttpException('Titulo Não Existe',HttpStatus.NOT_FOUND)

            return await this.TituloRepository.save(titulo)
        }

    //Deletar linha
        async delete(id:number): Promise <DeleteResult>{
            let buscarTitulo = await this.findById(id)

            if(!buscarTitulo)
                throw new HttpException('Titulo Não Encontrada', HttpStatus.NOT_FOUND)

                return await this.TituloRepository.delete(id)
        }
    }