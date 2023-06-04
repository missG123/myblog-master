declare global {
    interface CommentContent {
        commentId?: string,
        commentTime: string,
        commentText: string,
        replayList?: Array,
        commentblogId?: string,
        commentorNumber: string,
        commentorName: string,
        commentorAvatar: string,

    }
    interface ReplyContent {
        sendName: string,
        sendNumber: string,
        sendImg: string,
        replyCommentId?: string,
        sendTime: string,
        sendTo?: string,
        replyText: string,
        replyRank: string
    }
}
export { }