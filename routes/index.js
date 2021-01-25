// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入路由模組
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

// 將網址結構符合 /restaurant 字串開頭的 request 導向 todos 模組

router.use('/restaurant', authenticator, restaurants) //加入驗證程序
router.use('/search', search)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) //加入驗證程序

// 匯出路由器
module.exports = router