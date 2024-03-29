
// 导入mongoose
const mongoose = require('mongoose')

// 创建文档的结构对象，设置集合中文档的属性和属性值类型
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
})

// 创建模型对象，对文档操作的封装对象
let UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel