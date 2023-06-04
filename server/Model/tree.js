import express from 'express';
import tree from '../Schema/tree.js';
const treeRouter = express.Router();

treeRouter.post('/addTree', (req, res) => {
    tree.create(req.body).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'addtree failed',
            data: err
        })
    })
})
treeRouter.get('/getTree', (req, res) => {
    tree.find().then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: u
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'findtree failed',
            data: err
        })
    })
})

export default treeRouter;