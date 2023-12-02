var express = require('express');
var router = express.Router();

// 导入mongodb模型文件
const AccountModel = require('../../models/Accounts')
// 导入moment
const moment = require('moment');
const { render } = require('ejs');

// 声明中间件检测登录,checkLogin放在需要登录检查的路由里面即可
let checkLogin = (req, res, next) => {
  if (!req.session.username) {
    return res.render('author/login')
  }
  next()
}

/* 记账本列表页面*/
router.get('/account', checkLogin, function (req, res, next) {
  // 读取集合信息
  AccountModel.find().sort({ time: -1 }).then((data) => {
    res.render('list', { accounts: data, moment })
  })

});

// 添加记录页面
router.get('/account/create', checkLogin, function (req, res, next) {
  res.render('create')
});

// 新增记录
router.post('/account', checkLogin, function (req, res) {
  // 插入数据库
  AccountModel.create({ ...req.body, time: moment(req.body.time).toDate() }).then((data) => {
    // 成功提醒
    res.render('success', { msg: '添加成功哦', url: '/account' })
  })
})

// 删除记录
router.get('/account/:id', checkLogin, (req, res) => {
  // 获取id
  let id = req.params.id
  // 删除
  AccountModel.deleteOne({ _id: id }).then(data => {

    // 成功提醒
    res.render('success', { msg: '删除成功', url: '/account' })
  })

})
module.exports = router;
