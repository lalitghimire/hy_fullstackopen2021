import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {
    const blog = {
        title: 'this is blog render testing',
        author: 'tester',
        url: 'url.com',
        likes: 100,
    }

    const component = render(<Blog blog={blog} />)

    const div = component.container.querySelector('.blog')

    expect(div).toHaveTextContent('this is blog render testing')
    expect(div).toHaveTextContent('tester')
    expect(div).not.toHaveTextContent('url.com')
    expect(div).not.toHaveTextContent('100')
})
