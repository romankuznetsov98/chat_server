import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { assignIn } from 'lodash';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async create(createUserDto: CreateUserDto, roles: string[]): Promise<IUser> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(createUserDto.password, salt);

        const createdUser = new this.userModel(assignIn(createUserDto, {password: hash, roles}));
        return await createdUser.save();
    }

    async find(id: string): Promise<IUser> {
        return await this.userModel.findById(id).exec()
    }
}
