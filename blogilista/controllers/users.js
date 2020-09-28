const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (body.password === undefined) {
    return response.status(400).json({ error: 'password required' })
  }
  if (body.password <3)
    return response.status(400).json({ error: 'Minimum length of password is set to 3 character' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  try {
    const savedUser = await user.save()
    response.json(savedUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)
    if (user) {
      response.json(user.toJSON())
    }
    else {
      response.status(404).end()
    }
  }
  catch(exception) {
    console.log(exception)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title:1, author:1, url: 1, id: 1 })
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter

