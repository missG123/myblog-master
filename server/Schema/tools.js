import mongoose from 'mongoose'
const toolSchema = mongoose.Schema({
    toolId: String,
    toolImg: String,
    toolUrl: String,
    toolName: String,
    toolDescrib: String,
    toolSign: String
}, {
    collection: 'tool'
});
let tool = mongoose.model('tool', toolSchema);
export default tool;