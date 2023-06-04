import express from 'express';
import photo from '../Schema/photo.js';
const photoRouter = express.Router();

photoRouter.get('/getPhoto', (req, res) => {
    photo.find().then(u => {
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

photoRouter.delete('/deletePhoto', (req, res) => {
    photo.deleteOne(req.query).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'deletephoto failed',
            data: err
        })
    })
})
photoRouter.get('/getPhotoPage', (req, res) => {
    let { currentPage, pageSize } = req.query;
    photo.find().then(u => {
        let len = u.length;
        photo.find().skip((currentPage - 1) * pageSize).limit(pageSize).then(data => {
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
                message: 'getphotoPage failed',
                data: error
            })
        })
    }).catch((error) => {
        console.log('error');
        res.json({
            code: 500,
            message: 'findphoto failed',
            data: error
        });
    })
})

export default photoRouter
