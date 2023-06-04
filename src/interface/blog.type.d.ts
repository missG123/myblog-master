declare global {
    interface BlogContent {
        blogId?: String,
        title: String,
        writeTime: String,
        blogText: String,
        blogImg: String,
        describ: String,
        readNum?: Number,
        likeNum?: Number,
        blogDir: String,
        blogSign: String
    }
    interface ResponseContent {
        code: Number,
        msg: String,
        data: Object,
    }


}
export { }