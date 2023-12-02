
// 导入mongoose
const mongoose = require('mongoose')

// 创建文档的结构对象，设置集合中文档的属性和属性值类型
let AccountSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: Date,
    type: {
        type: Number,
        default: -1
    },
    account: {
        type: Number,
        required: true
    },
    remarks: { type: String }
})

// 创建模型对象，对文档操作的封装对象
let AccountModel = mongoose.model('accounts', AccountSchema)

module.exports = AccountModel