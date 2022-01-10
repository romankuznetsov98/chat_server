import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTokenDto } from './dto/token.dto';
import { IToken } from './interfaces/token.interface';

@Injectable()
export class TokenService {
    constructor(@InjectModel('Token') private readonly tokenModel: Model<IToken>) { }

    async create(createTokenDto: CreateTokenDto) {
        const userToken = new this.tokenModel(createTokenDto);
        return await userToken.save()
    }

    async delete(uId: string, token: string) {
        return await this.tokenModel.deleteOne({ uId, token });
    }

    async deleteAll(uId: string) {
        return await this.tokenModel.deleteMany({ uId });
    }

    async exists(uId: string, token: string) {
        return await this.tokenModel.exists({ uId, token });
    }
}
