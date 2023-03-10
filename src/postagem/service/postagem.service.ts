import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {
    
    constructor(
        @InjectRepository(Postagem)
        private PostagemRepository: Repository<Postagem>
        ){}

     //Get All
        async findAll(): Promise<Postagem[]>{
            return await this.PostagemRepository.find({
                relations:{
                    usuario: true
                },
            })
        }

     //Get por ID
        async findById(id: number): Promise<Postagem>{
            let postagem = await this.PostagemRepository.findOne({
                where: {
                    id
                }, relations:{
                    usuario:true
                }
            }) 

            if (!postagem)
            throw new HttpException('Postagem não existe',HttpStatus.NOT_FOUND)

            return postagem

        }
        

    //Create linha
        async create(postagem: Postagem): Promise<Postagem>{
            return this.PostagemRepository.save(postagem)
        }

    //Alteração linha
        async update(postagem: Postagem): Promise<Postagem>{
            let buscarPostagem = await this.findById(postagem.id)

            if(!buscarPostagem || !postagem.id)
            throw new HttpException('Postagem Não Existe',HttpStatus.NOT_FOUND)

            return await this.PostagemRepository.save(postagem)
        }

    //Deletar linha
        async delete(id:number): Promise <DeleteResult>{
            let buscarPostagem = await this.findById(id)

            if(!buscarPostagem)
                throw new HttpException('Postagem Não Encontrada', HttpStatus.NOT_FOUND)

                return await this.PostagemRepository.delete(id)
        }
    }