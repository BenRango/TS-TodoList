import { model, Schema } from "mongoose"

export interface INotification{
    message: string
    time: Date
    type: boolean
}

const NotificationSchema = new Schema<INotification>({
    message: String,
    time: Date,
    type: Boolean
})

export const Notification = model<INotification>("notifications", NotificationSchema)