import express from 'express';
import mongoose from './server/index.js';
import bodyParser from 'body-parser';
const app = express()
app.use(bodyParser.json({
}))
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', (req, res, next) => {
    // 响应头的设置，我的后台支持跨域请求
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'appliction/json;charset=utf-8');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("X-Powered-By", ' 3.2.1')
    next();
})


// 开放静态资源，打包后可以访问
app.get('/', (req, res) => {
    console.log('222');
    res.send('hello,express6')
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})