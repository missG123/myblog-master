import express from 'express'
import comment from '../Schema/comment.js'
const commentRouter = express.Router();
import { nanoid } from 'nanoid'

commentRouter.post('/addComment', (req, res) => {
    let commentinfo = {
        ...req.body,
        commentId: nanoid()
    }
    comment.create(commentinfo).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'addcomment failed',
            data: err
        })
    })
})

commentRouter.get('/getComment', (req, res) => {
    comment.find(req.query).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: u
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'addcomment failed',
            data: err
        })
    })
})
commentRouter.post('/addReply', (req, res) => {
    console.log(req.body.replyCommentId)
    comment.updateOne({ commentId: req.body.replyCommentId },
        { $push: { replayList: req.body } }).then(u => {
            res.json({
                code: 200,
                message: 'success',
                data: {}
            })
        }).catch(err => {
            res.json({
                code: 500,
                message: 'addreply failed',
                data: err
            })
        })
})


export default commentRouter