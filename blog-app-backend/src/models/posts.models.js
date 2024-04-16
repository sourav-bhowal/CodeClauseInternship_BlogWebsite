import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: {
            public_id: String,
            url: String
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });


postSchema.plugin(mongooseAggregatePaginate);

export const Post = mongoose.model("Post", postSchema)