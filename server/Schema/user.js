// 引入mongoose模块
import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
    userId: String,
    number: String,
    pwd: String,
    name: String,
    imgUrl: String,
}, {
    collection: 'user'
})
let user = mongoose.model('user', userSchema);
export default user;