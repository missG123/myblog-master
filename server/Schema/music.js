import mongoose from 'mongoose'
const musicSchema = mongoose.Schema({
    musicId: String,
    musicImg: String,
    musicPath: String,
    musicName: String,
    musicSign: String
}, {
    collection: 'music'
});
let music = mongoose.model('music', musicSchema);
export default music;