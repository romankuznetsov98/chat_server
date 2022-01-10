import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService
    ) {}

    signUp(createUserDto: CreateUserDto) {}

    singIn(email: string, password: string) {}

    async generateToken(data, signOptions?: SignOptions) {
        return this.jwtService.sign(data, signOptions);
    }

    async verifyToken(token: string) {
        try {
            const data = this.jwtService.verify(token);
            const tokenExist = this.tokenService.exists(data._id, token);
            if(tokenExist) {
                return data;
            }
            throw new UnauthorizedException();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
