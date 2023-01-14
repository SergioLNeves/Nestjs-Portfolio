import { Module } from "@nestjs/common";
import { UsuarioModule } from "../usuario/usuario.modulle";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { Bcrypt } from "./bcrypt/bcrypt";
import { AuthService } from "./service/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthController } from "./controllers/auth.controller";


@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '24h'}, //Horario sempre fechado, horario do usuario

        })
    ],
    providers: [Bcrypt, AuthService, LocalStrategy,JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt]
})
export class AuthModule { }