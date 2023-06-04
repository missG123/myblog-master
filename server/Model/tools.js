import express from 'express'
import tool from '../Schema/tools.js'
import { nanoid } from 'nanoid'
const toolRouter = express.Router()

toolRouter.post('/addTool', (req, res) => {
    const id = nanoid()
    let toolinfo = {
        ...req.body,
        toolId: id
    }
    tool.create(toolinfo).then((u) => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'addtool fail',
            data: err
        })
    })
})
toolRouter.get('/getToolList', (req, res) => {
    tool.find(req.query).then(u => {
        console.log(u)
        res.json({
            code: 200,
            message: 'success',
            data: u
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'addtool fail',
            data: err
        })
    })
})
toolRouter.delete('/deleteTool', (req, res) => {
    tool.deleteOne(req.query).then(u => {
        res.json({
            code: 200,
            message: 'success',
            data: {}
        })
    }).catch(err => {
        res.json({
            code: 500,
            message: 'deletetool fail',
            data: err
        })
    })
})


export default toolRouter