import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputT = screen.getByPlaceholderText('Title')
  const inputA = screen.getByPlaceholderText('Author')
  const inputU = screen.getByPlaceholderText('Url')
  const sendButton = screen.getByText('Create')
  await user.type(inputT, 'title')
  await user.type(inputA, 'author')
  await user.type(inputU, 'urlurl')
  await user.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]['title']).toBe('title')
  expect(createBlog.mock.calls[0][0]['author']).toBe('author')
  expect(createBlog.mock.calls[0][0]['url']).toBe('urlurl')
})