/* 
@param{*} success——数据库连接成功的回调
@param{*} error ——数据库连接失败的回调
*/
module.exports = function (success, error) {
    // 导入 mongoose
    const mongoose = require('mongoose')
    // 导入配置文件中数据库配置
    const { DBHOST, DBPORT, DBNAME } = require('../config/config')
    // 连接 mongodb
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

    /* 设置连接成功的回调 */
    mongoose.connection.once('open', () => {

        success()
    })

    /* 设置连接失败的回调 */
    mongoose.connection.on('error', () => {
        error()
    })

    /* 设置连接关闭的回调 */
    mongoose.connection.on('close', () => {
        console.log('关闭')
    })
}