import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.modulle';
import { Postagem } from './postagem/entities/postagem.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { TituloModule } from './titulo/titulo.module';
import { Titulo } from './titulo/entities/titulo.entity';
import { Portfolio } from './portfolio/entities/portfolio.entity';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
     TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username:'root',
        password: 'root',
        database: 'db_portfolio',
        entities: [Postagem,Usuario,Titulo,Portfolio],
       synchronize: true
     }),  

    //   type:'postgres',
    //   url: process.env.DATABASE_URL,
    //   logging: false,
    //   dropSchema: false,
    //   ssl: {
    //     rejectUnauthorized: false
    //   },
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),  
    
    PostagemModule,
    UsuarioModule,
    AuthModule,
    TituloModule,
    PortfolioModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
