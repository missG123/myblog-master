import mongoose from 'mongoose'
const blogSchema = mongoose.Schema({
    blogId: String,
    title: String,
    writeTime: String,
    blogText: String,
    blogImg: String,
    describ: String,
    readNum: Number,
    likeNum: Number,
    blogDir: String,
    blogSign: String
}, {
    collection: 'blog'
});
let blog = mongoose.model('blog', blogSchema);
export default blog;