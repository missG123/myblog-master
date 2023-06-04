import express from 'express';
import mongoose from './server/index.js';
import bodyParser from 'body-parser';

import jwt from 'jsonwebtoken'

const app = express()
app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({ extended: false }));

const hasOneOf = (str, arr) => {
    return arr.some(item => item.includes(str))
}

const blackList = {
    get: [
        '/api/user/getUser',
        '/api/user/checkToken'
    ],
    post: [

    ]
}

app.all('*', (req, res, next) => {
    // 响应头的设置，我的后台支持跨域请求
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'appliction/json;charset=utf-8');
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("X-Powered-By", ' 3.2.1')

    let method = req.method.toLowerCase()
    let path = req.path
    if (blackList[method] && hasOneOf(path, blackList[method])) {
        const token = req.headers.token;
        if (!token) {
            res.json({
                code: 400,
                message: 'token error',
                data: {}
            })
        } else {
            jwt.verify(token, 'myblog', (err, decode) => {
                if (err) {
                    res.json({
                        code: 400,
                        message: 'token no effect',
                        data: {}
                    })
                } else {
                    req.number = decode.number
                    next()
                }
            })
        }
    } else {
        next();
    }

})


// 开放静态资源，打包后可以访问
/* app.all('*', (req, res, next) => {
    console.log('2222');
    res.send('hello express')
})
 */
app.listen(3000, () => {
    console.log('http://localhost:3000');
})

import blogRouter from './server/Model/blog.js'
app.use('/api/blog', blogRouter);
import toolRouter from './server/Model/tools.js'
app.use('/api/tools', toolRouter);
import uploadRouter from './server/Model/upload.js'
app.use('/api/upload', uploadRouter);
import musicRouter from './server/Model/music.js'
app.use('/api/music', musicRouter);
import photoRouter from './server/Model/photo.js'
app.use('/api/photo', photoRouter);
import commentRouter from './server/Model/comment.js'
app.use('/api/comment', commentRouter);
import router from './server/Model/user.js'
app.use('/api/user', router);
import treeRouter from './server/Model/tree.js'
app.use('/api/tree', treeRouter); 