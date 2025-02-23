import mongoose, {Document, Schema, Types} from "mongoose";

export interface ITask extends Document {
    _id: Types.ObjectId;
    title: string;
    completed: boolean;
    parentId: Types.ObjectId;
    subtasks: Types.ObjectId[];
}

const TaskSchema: Schema = new Schema({
    title: {type: String, require: true},
    completed: {type: Boolean, default: false},
    parentId: {type : mongoose.Schema.Types.ObjectId, ref:"Task"},
    subtasks:[{type : mongoose.Schema.Types.ObjectId, ref:"Task"}],
});

export default mongoose.model<ITask>("Task", TaskSchema);