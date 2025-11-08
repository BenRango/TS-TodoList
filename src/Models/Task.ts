import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
    label: string;
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
        completedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

export const Task = mongoose.model<ITask>('Task', TaskSchema);

