import express from 'express';
import blog from '../Schema/blog.js';
const blogRouter = express.Router();
import { nanoid } from 'nanoid'



blogRouter.post('/addBlog', (req, res) => {
    let id = nanoid();
    let reqInfo = {
        ...req.body,
        blogId: id,
        readNum: 0,
        likeNum: 0,
    }
    blog.create(reqInfo).then((u) => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch((error) => {
        console.log('error');
        res.json({
            code: 500,
            message: 'addblog failed',
            data: error
        });
    })
})

blogRouter.get('/getBlog', (req, res) => {
    blog.find().sort([['_id', -1]]).then((u) => {
        res.json({
            code: 200,
            message: 'success',
            data: u
        })
    }).catch((error) => {
        console.log('error');
        res.json({
            code: 500,
            message: 'getblog failed',
            data: error
        });
    })
})

blogRouter.delete('/deleteBlog', (req, res) => {
    blog.deleteOne(req.query).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch((error) => {
        console.log('error');
        res.json({
            code: 500,
            message: 'deleteblog failed',
            data: error
        });
    })

})
blogRouter.get('/getBlogInfo', (req, res) => {
    blog.findOne(req.query).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: u
        })
    }).catch((error) => {
        console.log('error');
        res.json({
            code: 500,
            message: 'findblog failed',
            data: error
        });
    })
})
blogRouter.post('/updateBlog', (req, res) => {
    blog.updateOne({ blogId: req.body.blogId }, { $set: req.body }).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch((error) => {
        console.log('error');
        res.json({
            code: 500,
            message: 'updatablog failed',
            data: error
        });
    })
})
blogRouter.get('/getSignNum', (req, res) => {
    blog.distinct('blogSign').then(u => {
        console.log(u)
        res.json({
            code: 200,
            message: 'success',
            data: u.length
        })
    }).catch((error) => {
        console.log('error');
        res.json({
            code: 500,
            message: 'updatablog failed',
            data: error
        });
    })
})
blogRouter.post('/updateReadNum', (req, res) => {
    blog.updateOne({ blogId: req.body.blogId }, { $set: { readNum: req.body.readNum } }).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch((error) => {
        console.log('error');
        res.json({
            code: 500,
            message: 'updataReadNum failed',
            data: error
        });
    })
})

blogRouter.get('/getBlogPage', (req, res) => {
    let { currentPage, pageSize } = req.query;
    blog.find().then(u => {
        let len = u.length;
        blog.find().skip((currentPage - 1) * pageSize).limit(pageSize).then(data => {
            res.json({
                code: 200,
                message: 'success',
                data: {
                    total: len,
                    pageData: data
                }
            })
        }).catch(err => {
            res.json({
                code: 500,
                message: 'getblogPage failed',
                data: error
            })
        })
    }).catch((error) => {
        console.log('error');
        res.json({
            code: 500,
            message: 'findblog failed',
            data: error
        });
    })
})

blogRouter.get('/getBlogLatest', (req, res) => {
    blog.find().sort([['_id', -1]]).limit(8).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: u
        })
    }).catch((error) => {
        console.log('error');
        res.json({
            code: 500,
            message: 'findblog failed',
            data: error
        });
    })
})

export default blogRouter;