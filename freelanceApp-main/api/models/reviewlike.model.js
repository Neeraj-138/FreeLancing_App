//new code
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewLikeSchema = new Schema({
    userId:{
        type:String,
        required:true,
    },
    reviewId:{
        type:String,
        required:true,
    },
},{
    timestamps:true
});
export default mongoose.model("ReviewLike",ReviewLikeSchema)
//new code