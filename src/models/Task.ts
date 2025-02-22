import mongoose, {Document, Schema} from "mongoose";

export interface ITask extends Document {
    title: string;
    completed: boolean;
    subtasks: ITask[];
}

const TaskSchema: Schema = new Schema({
    title: {type: String, require: true},
    completed: {type: Boolean, default: false},
    subtasks:[{type : mongoose.Schema.Types.ObjectId, ref:"Task"}],
});

export default mongoose.model<ITask>("Task", TaskSchema);