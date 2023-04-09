import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'maxim title',
    author: 'maxim author',
    url: 'maxim url',
    likes: 37,
    user: {
      username: 'Max',
    },
  }

  render(<Blog blog={blog}  />)

  const element = screen.getByText('maxim author', { exact: false })

  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'maxim title',
    author: 'maxim author',
    url: 'maxim url',
    likes: 37,
    user: {
      username: 'Max',
    },
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  expect(mockHandler.mock.calls[0][0].likes).toEqual(blog.likes+1)
})

test('blog renders the blogs title and author, but does not render its URL or number of likes by default', async () => {
  const blog = {
    title: 'maxim title',
    author: 'maxim author',
    user: {
      username: 'Max',
    },
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].url).toBeUndefined()
  expect(mockHandler.mock.calls[0][0].likes).toBeNaN()

})

test('blogs URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
  const blog = {
    title: 'maxim title',
    author: 'maxim author',
    url: 'maxim url',
    likes: 37,
    user: {
      username: 'Max',
    },
  }

  render(
    <Blog blog={blog}  />
  )

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)
  const url = screen.getByText('maxim url', { exact: false })
  const likes = screen.getByText('37', { exact: false })
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title: 'maxim title',
    author: 'maxim author',
    url: 'maxim url',
    likes: 37,
    user: {
      username: 'Max',
    },
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)
  console.log(mockHandler.mock.calls)
  expect(mockHandler.mock.calls).toHaveLength(2)

})