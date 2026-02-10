export interface TaskComponent{
    _id: String,
    label ?: String 
    state ?: boolean
    createdAt ?: Date
    updatedAt : Date | null 
    deadline?: Date   
    completedAt : Date | null 
    position ?: number 
}