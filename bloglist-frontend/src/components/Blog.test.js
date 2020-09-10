import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'jest-dom',
    url: 'www.fullstackopen.com',
    likes: 5,
    user : {
      username: 'alexander',
      id: 123,
      name: 'allu',
    }
  }

  const component = render(
    <Blog blog={blog}
    />
  )

  component.debug()

  expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
  expect(component.container).toHaveTextContent('jest-dom')
})

test('button show url & likes-test', async () => {
  const users = {
    username: 'alexander'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'jest-dom',
    url: 'www.fullstackopen.com',
    likes: 120,
    user : {
      username: 'alexander',
      id: 123,
      name: 'allu',
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} users={users} setBlogs={mockHandler}

    />
  )

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('www.fullstackopen.com')
  expect(component.container).toHaveTextContent(120)
})

test('clicking the button twice calls event handler twice', async () => {
  const users = {
    username: 'alexander'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'jest-dom',
    url: 'www.fullstackopen.com',
    likes: 112452,
    user : {
      username: 'alexander',
      id: 123,
      name: 'allu',
    }
  }

  const blog2 = {
    title: 'Component testing is done with react-testing-library',
    author: 'jest-dom',
    url: 'www.fullstackopen.com',
    likes: 112452,
    user : {
      username: 'alexander',
      id: 123,
      name: 'allu',
    }
  }

  const blogs = [blog,blog2]

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} users={users} setBlogs={mockHandler} blogs={blogs}
    />
  )

  const button3 = component.getByText('View')
  fireEvent.click(button3)

  const button2 = component.getByText('Vote')
  fireEvent.click(button2)
  expect(mockHandler.mock.calls).toHaveLength(1)
})