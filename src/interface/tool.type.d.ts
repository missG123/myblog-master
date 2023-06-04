declare global {
    interface ToolContent {
        toolId?: String,
        toolImg: String,
        toolUrl: String,
        toolName: String,
        toolDescrib: String,
        toolSign: String
    }
    interface ListClass {
        listName: String,
        toollist: Array<ToolContent>,
        sign: String
    }
}
export { }