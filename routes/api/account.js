var express = require('express');
var router = express.Router();

// 导入mongodb模型文件
const AccountModel = require('../../models/Accounts')
// 导入moment
const moment = require('moment')

// 导入jwt
const jwt = require('jsonwebtoken')

// 创建检验token的中间件
let checkToken = (req, res, next) => {
    // 获取token
    let token = req.get('token')

    // 判断token是否存在
    if (!token) {
        return res.json({
            code: '2003',
            msg: 'token缺失',
            data: null
        })
    }
    // 校验token
    jwt.verify(token, "aoliao", err => {
        console.log('错误', err)
    }).then(data => {
        console.log(data)
        next()
    })

}


/* 获取记账本列表*/
router.get('/account', checkToken, function (req, res, next) {
    // 读取集合信息
    AccountModel.find().sort({ time: -1 }).then((data) => {
        res.json({
            code: '0000',// 响应编号,也可以设置为20000，银联、微信就用0000
            msg: '读取成功',// 响应信息
            data,// 响应数据
        })
    })

});
/* 获取记账本单条记录*/
router.get('/account/:id', function (req, res, next) {
    // 获取id
    let id = req.params.id
    // 读取集合信息
    AccountModel.findById(id).then((data) => {
        res.json({
            code: '0000',// 响应编号,也可以设置为20000，银联、微信就用0000
            msg: '读取成功',// 响应信息
            data,// 响应数据
        })
    })

});

// 新增记录
router.post('/account', function (req, res) {
    // 插入数据库
    AccountModel.create({ ...req.body, time: moment(req.body.time).toDate() }).then((data) => {
        // 成功提醒
        res.json({
            code: '0000',// 响应编号,也可以设置为20000，银联、微信就用0000
            msg: '添加成功',// 响应信息
            data,// 响应数据
        })
    })
})

// 更新单个账单记录
router.patch('/account/:id', function (req, res) {
    const id = req.params.id
    // 更新数据库记录
    AccountModel.updateOne({ _id: id }, req.body).then((data) => {
        AccountModel.findById(id).then(data => {
            // 成功提醒
            res.json({
                code: '0000',// 响应编号,也可以设置为20000，银联、微信就用0000
                msg: '更新成功',// 响应信息
                data,// 响应数据
            })
        })

    })
})


// 删除记录
router.delete('/account/:id', (req, res) => {
    // 获取id
    let id = req.params.id
    // 删除
    AccountModel.deleteOne({ _id: id }).then(data => {

        // 成功提醒
        res.json({
            code: '0000',// 响应编号,也可以设置为20000，银联、微信就用0000
            msg: '删除成功',// 响应信息
            data: {},// 响应数据
        })
    })

})

module.exports = router;
