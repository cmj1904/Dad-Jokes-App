const User = require('../../api/users/user-model')

const validateUsername = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    next({
      status: 422,
      message: "username and password required"
    })
  } else {
    next()
  }
}

const usernameDoesNotExist = async (req, res, next) => {
  try {
    const [user] = await User.findBy({
      username: req.body.username
    })
    if (!user) {
      next({
        status: 422,
        message: "invalid credentials"
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

const usernameExists = async (req, res, next) => {
  const [user] = await User.findBy({
    username: req.body.username
  })
  try {
    if (user) {
      next({
        status: 422,
        message: "username taken"
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  validateUsername,
  usernameExists,
  usernameDoesNotExist
}