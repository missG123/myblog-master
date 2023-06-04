import mongoose from 'mongoose'
const commentSchema = mongoose.Schema({
    commentId: String,
    commentTime: String,
    commentText: String,
    replayList: Array,
    commentblogId: String,
    commentorNumber: String,
    commentorName: String,
    commentorAvatar: String,
}, {
    collection: 'comment'
});
let comment = mongoose.model('comment', commentSchema);
export default comment;