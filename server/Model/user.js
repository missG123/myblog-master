// 引入express模块
import express from 'express'
// 定义路由级中间件
const router = express.Router();
// 引入数据模型模块
import user from '../Schema/user.js';
import { nanoid } from 'nanoid'
// token验证
import jwt from 'jsonwebtoken'
// 登录
router.post('/login', (req, res) => {
    const { number, pwd } = req.body;
    if (number && pwd) {
        user.findOne({ number }).then(u => {
            if (u && u.pwd == pwd) {
                let token = jwt.sign({ number: u.number }, 'myblog', { 'expiresIn': 6000 });
                res.json({
                    code: 200, message: 'success', data: { token }
                })
            } else {
                res.json(
                    {
                        code: 500, message: 'find pwd failed', data: err
                    })
            }
        }).catch(err => {
            res.json(
                {
                    code: 500, message: 'find pwd failed', data: err
                })
        })
    } else {
        res.json({
            code: 400, message: 'number、pwd is empty', data: {}
        })
    }
});
// 查询用户信息
router.get('/getUser', (req, res) => {
    user.findOne({ number: req.number }).then((u) => {
        if (u != null) {
            res.json({
                code: 200,
                message: 'success',
                data: u
            });
        } else {
            res.json({
                code: 400,
                message: 'no find user',
                data: { note: '找不到该用户' }
            });
        }
    }).catch((err) => {
        res.json({
            code: 500,
            message: 'finduser failed',
            data: err
        }
        )
    })
})
// 注册
router.post('/register', (req, res) => {
    let userinfo = {
        ...req.body,
        userId: nanoid()
    }
    user.create(userinfo).then((u) => {
        res.json({ code: 200, message: 'success', data: {} })
    }).catch((err) => {
        res.json({ code: 200, message: 'failed', data: err });
    })
});
// 用户是否已存在
router.get('/getHasUser', (req, res) => {
    user.findOne({ number: req.query.number }).then((u) => {
        if (!u) {
            res.json({ code: 200, message: 'ok', data: { message: '请注册' } });
        } else {
            res.json({ code: 200, message: 'no', data: { message: '用户已存在' } });
        }
    }).catch((err) => {
        console.log(2);
        res.json({ code: 500, message: 'failed', data: err });
    })
})

router.get('/checkToken', (req, res) => {
    let number = req.number;
    let token = jwt.sign({ number: number }, 'myblog', { 'expiresIn': 6000 });
    res.json({
        code: 200, message: 'success', data: { token }
    })
})

export default router;