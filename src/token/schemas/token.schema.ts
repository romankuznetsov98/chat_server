import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
    token: { type: String, required: true }, // сам токен
    uId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // id юзера для которого храним токен
    expireAt: { type: Date, required: true } // дата создания токена
})

TokenSchema.index({token: 1, uId: 1}, {unique: true});