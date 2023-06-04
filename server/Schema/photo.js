import mongoose from 'mongoose'
const photoSchema = mongoose.Schema({
    photoId: String,
    photoImg: String,
}, {
    collection: 'photo'
});
let photo = mongoose.model('photo', photoSchema);
export default photo;