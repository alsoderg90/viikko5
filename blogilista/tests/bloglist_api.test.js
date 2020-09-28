/* eslint-disable no-undef */

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const initialBlogs = [

  {
    title:'React patterns',
    author:'Michael Chan',
    url:'https://reactpatterns.com/',
    likes:7
  },
  {
    title:'Go To Statement Considered Harmful',
    author:'Edsger W. Dijkstra',
    url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes:5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogeObject = new Blog(initialBlogs[0])
  await blogeObject.save()

  blogeObject = new Blog(initialBlogs[1])
  await blogeObject.save()
})

const api = supertest(app)

/*
test('empty title/url', async () => {
  const newBlog = {
    author: 'test',
    likes:3
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
})

test('like test', async () => {
  const newBlog = {
    title: 'test',
    author: 'test',
    url: "www.google.fi"
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[response.body.length-1].likes).toBe(0)
  console.log("listalla", response.body[2], "pituus",response.body.length)
})

test('post method succeeded', async () => {
  const newBlog = {
    title: 'test',
    author: 'test',
    url: "www.google.fi",
    likes: 3
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length+1)
  expect(titles).toContain('test')
}) */

test('id field is neither _id nor object', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain('React patterns')
})

afterAll(() => {
  mongoose.connection.close()
})