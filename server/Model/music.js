import express from 'express';
import music from '../Schema/music.js';
const musicRouter = express.Router();
import { nanoid } from 'nanoid'

import multer from 'multer'
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let url = 'uploads/' + file.fieldname;
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, url);
    },
    filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        // 将保存文件名设置
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage })


musicRouter.post('/addMusic', upload.single('audio'), (req, res) => {
    console.log(req.file)
    console.log(JSON.parse(req.body.musicinfo))
    let id = nanoid()
    let reqData = JSON.parse(req.body.musicinfo);
    reqData.musicPath = `http://localhost:5173/${req.file.destination}/${req.file.filename}`;
    reqData['musicId'] = id;
    music.create(reqData).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'addmusic failed',
            data: err
        })
    })

})

musicRouter.get('/getMusic', (req, res) => {
    music.find(req.query).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: u
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'addmusic failed',
            data: err
        })
    })

})
musicRouter.delete('/deleteMusic', (req, res) => {
    music.deleteOne(req.query).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'deletemusic failed',
            data: err
        })
    })

})


export default musicRouter