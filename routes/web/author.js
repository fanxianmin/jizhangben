var express = require('express');
var router = express.Router();

// 导入单向加密算法MD5，只能通过源数据找到加密数据，处理密码
const md5 = require('md5')

// 导入mongodb模型文件
const UserModel = require('../../models/UserModel');

// 响应HTML内容
router.get('/reg', (req, res) => {
  res.render('author/reg')
})
router.get('/login', (req, res) => {
  res.render('author/login')
})

// 注册用户
router.post('/reg', (req, res) => {
  // 1.表单验证，略过
  // 2.获取请求体数据，使用md5单向加密密码
  console.log('加密', md5(req.body.password))
  UserModel.create(req.body).then(data => {
    console.log(data)
    res.render('success', { msg: '注册成功', url: '/login' })
  })
})

// 用户登录
router.post('/login', (req, res) => {
  // 1.表单验证，略过

  // 2.获取请求体数据
  const { username, password } = req.body

  UserModel.findOne({ username, password }).then(data => {

    // 设置session信息
    req.session.username = data.username
    req.session._id = data._id
    console.log(req.session)

    res.render('success', { msg: '登录成功', url: '/account' })
  })
})
// 退出登录
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', { msg: '退出成功', url: '/login' })
  })
})
module.exports = router;
