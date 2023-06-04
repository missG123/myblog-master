import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/myblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('mongoose connect...'))
    .catch((err) => console.log(err));
export default mongoose