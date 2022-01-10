import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TokenService } from "src/token/token.service";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";
import { IUser } from "src/user/interfaces/user.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
            passReqToCallback: true
        });
    }

    async validate(req, user: Partial<IUser>) {
        const token = req.headers.authorization.slice(7);
        const tokenExist = this.tokenService.exists(user._id, token);
        if (tokenExist) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }
}