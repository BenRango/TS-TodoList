import mongoose, { Document, Schema } from 'mongoose';
import { User } from './User.js';

export interface ITask extends Document {
    label: string;
    author : string | typeof User
    description?: string;
    completedAt?: Date;
    deadline ?: Date
    state : boolean,
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema: Schema = new Schema<ITask>(
    {
        label: { type: String, required: true },
        description: { type: String, required: false },
        deadline : Date,
        state: Boolean,
        author: [{ type: Schema.Types.ObjectId, ref: User }],
        completedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

export const Task = mongoose.model<ITask>('Task', TaskSchema);

