var express = require('express');
var router = express.Router();

// 导入单向加密算法MD5，只能通过源数据找到加密数据，处理密码
const md5 = require('md5')

// 导入mongodb模型文件
const UserModel = require('../../models/UserModel');

// 导入JWT
const jwt = require('jsonwebtoken')

// 用户登录
router.post('/login', (req, res) => {
  // 1.表单验证，略过

  // 2.获取请求体数据
  const { username, password } = req.body

  UserModel.findOne({ username, password }).then(data => {
    // 创建token
    let token = jwt.sign({
      username: data.username,
      _id: data._id,
    }, 'aoliao', { expiresIn: 60 * 60 })

    // 响应返回 token
    res.json({
      code: '0000',
      msg: '登录成功',
      data: token
    })
    // res.render('success', { msg: '登录成功', url: '/account' })
  })
})


// 退出登录
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', { msg: '退出成功', url: '/login' })
  })
})
module.exports = router;
