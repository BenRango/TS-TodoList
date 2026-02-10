import mongoose, { Schema } from "mongoose";
interface UserInterface{
    _id?: string;
    username: string;
    email: string;
    password?: string;
    toPayload() : ()=> {
        id: string
        username: string
        email: string
    }
}

const UserSchema = new Schema<UserInterface>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true, select: false}
}, {
    timestamps: true
})

export const User = mongoose.model('User', UserSchema)