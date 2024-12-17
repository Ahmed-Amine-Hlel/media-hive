import {model, Schema} from "mongoose";
import {IActor} from "../types/Actor";


const actorSchema = new Schema<IActor>({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => {
                return /^(http|https):\/\/[^\s]+$/i.test(value);
            },
            message: "Invalid URL for image",
        },
    },
}, {timestamps: true});

const Actor = model<IActor>("Actor", actorSchema);

export default Actor;