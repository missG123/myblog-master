import express from 'express';
const uploadRouter = express.Router()
import multer from 'multer'
import { nanoid } from 'nanoid';
import photo from '../Schema/photo.js';

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
uploadRouter.post('/uploadeditor_img', upload.single('editor_img'), (req, res) => {
    res.json({
        code: 200,
        message: 'uploadimg success',
        data: {
            responseFile: req.file
        }
    })
})
uploadRouter.post('/uploadeditImg', upload.single('editImg'), (req, res) => {
    res.json({
        code: 200,
        message: 'uploadimg success',
        data: {
            responseFile: req.file
        }
    })
})
uploadRouter.post('/uploadboxImg', upload.single('boxImg'), (req, res) => {
    res.json({
        code: 200,
        message: 'uploadimg success',
        data: {
            responseFile: req.file
        }
    })
})
uploadRouter.post('/uploadmusicImg', upload.single('musicImg'), (req, res) => {
    res.json({
        code: 200,
        message: 'uploadimg success',
        data: {
            responseFile: req.file
        }
    })
})

uploadRouter.post('/uploadphotoImg', upload.array('photoImg'), (req, res) => {
    console.log(req.files)
    let photoList = []
    for (let item of req.files) {
        let photoinfo = {}
        photoinfo['photoId'] = nanoid();
        photoinfo['photoImg'] = `http://localhost:5173/${item.destination}/${item.filename}`;
        photoList.push(photoinfo);
    }
    photo.insertMany(photoList).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'addphoto failed',
            data: err
        })
    })
})





export default uploadRouter