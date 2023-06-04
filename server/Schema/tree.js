import mongoose from 'mongoose'
const treeSchema = mongoose.Schema({
    treeImg: String,
    left: Number,
    top: Number,
    treeText: String,
    rate: Number
}, {
    collection: 'tree'
});
let tree = mongoose.model('tree', treeSchema);
export default tree;