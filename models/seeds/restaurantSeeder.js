const restaurant = require('../restaurant')
const User = require('../user')
const restaurantListDB = require('./restaurant.json')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const db = require('../../config/mongoose')

const SEED_USER = [
  User1 = {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
  },
  User2 = {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
  }
]

db.once('open', () => {
  SEED_USER.forEach(user => {
    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        if (user.email === 'user1@example.com') {
          return Promise.all(Array.from(
            { length: 3 }, (_, i) => restaurant.create({ ...restaurantListDB.results[i], userId })
          ))
        }
        return Promise.all(Array.from(
          { length: 3 }, (_, i) => restaurant.create({ ...restaurantListDB.results[i + 3], userId })
        ))
      })
      .then(() => {
        console.log('done')
        process.exit()
      })
  })
})



// 第一位使用者：
// email: user1@example.com
// password: 12345678
// 擁有 #1, #2, #3 號餐廳
// 第二位使用者：
// email: user2@example.com
// password: 12345678
// 擁有 #4, #5, #6 號餐廳