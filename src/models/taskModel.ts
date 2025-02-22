import mongoose, {Document, Schema, Types} from "mongoose";

export interface ITask extends Document {
    _id: Types.ObjectId;
    title: string;
    completed: boolean;
    isParentId: boolean;
    subtasks: Types.ObjectId[];
}

const TaskSchema: Schema = new Schema({
    title: {type: String, require: true},
    completed: {type: Boolean, default: false},
    isParentId: {type: Boolean, default: false},
    subtasks:[{type : mongoose.Schema.Types.ObjectId, ref:"Task"}],
});

export default mongoose.model<ITask>("Task", TaskSchema);